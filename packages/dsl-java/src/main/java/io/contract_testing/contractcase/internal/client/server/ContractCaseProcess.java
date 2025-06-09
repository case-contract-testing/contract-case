package io.contract_testing.contractcase.internal.client.server;


import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ContractCaseProcess {

  private static ContractCaseProcess instance;
  private int portNumber;
  private ReaderSink outputStreamSink;

  /**
   * This indicates that the shutdown has been triggered, it exists to prevent the crash printer
   * from thinking that errors communicating with an intentionally-shutdown server are an error
   * (instead, they indicate that the close() method wasn't called cleanly)
   */
  private volatile boolean shutdownTriggered = false;

  public static synchronized ContractCaseProcess getInstance() {
    if (instance == null) {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Creating process instance");
      instance = new ContractCaseProcess();
    }
    return instance;
  }


  private Process childProcess;

  /**
   * Child's standard output.
   */
  private BufferedReader stdout;

  /**
   * The error stream sink ensures that all standard error from the binary is captured
   */
  private StreamSink errorStreamSink;


  /**
   * This hook ensures that the ContractCase binary is shutdown on JVM shutdown
   */
  private Thread shutdownHook;

  public synchronized void start() {
    this.startRuntimeIfNeeded();
    if (this.childProcess == null && overridePort == 0) {
      throw new ContractCaseCoreError("Server process not started");
    }
  }

  private int overridePort = 0;

  public boolean processShutdownTriggered() {
    return this.shutdownTriggered;
  }

  private synchronized void startRuntimeIfNeeded() {
    var envOverridePort = System.getenv("CASE_CONNECTOR_OVERRIDE_PORT");

    if (envOverridePort != null) {
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Overriding port to: " + envOverridePort);
        this.overridePort = Integer.parseInt(envOverridePort);

      } catch (NumberFormatException e) {
        throw new ContractCaseConfigurationError(
            "Unable to parse the custom port from '" + envOverridePort
                + "'. Make sure CASE_CONNECTOR_OVERRIDE_PORT is set to an integer",
            "INVALID_CONFIG"
        );
      }
      return;
    }

    if (childProcess != null) {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Runtime is already started");
      return;
    }
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Starting runtime");

    final List<String> serverStartCommand = List.of(
        "node",
        ConnectorExtractor.extractCaseConnector()
    );

    try {
      final ProcessBuilder pb = new ProcessBuilder()
          .command(serverStartCommand)
          .redirectError(ProcessBuilder.Redirect.PIPE)
          .redirectOutput(ProcessBuilder.Redirect.PIPE)
          .redirectInput(ProcessBuilder.Redirect.PIPE);
      pb.environment()
          .put(
              "CASE_CONNECTOR_CLIENT",
              String.format("Java/%s", System.getProperty("java.version"))
          );
      pb.environment().put("NODE_OPTIONS", "--enable-source-maps");

      this.childProcess = pb.start();

      this.errorStreamSink = new StreamSink(this.childProcess.getErrorStream());
      this.errorStreamSink.start();

      this.stdout = new BufferedReader(new InputStreamReader(
          this.childProcess.getInputStream(),
          StandardCharsets.UTF_8
      ));
      var firstLine = stdout.readLine();
      if (firstLine == null) {
        throw new ContractCaseCoreError(
            "Unable to start ContractCase internal server, output stream terminated unexpectedly");
      }
      var splitLine = firstLine.split(":\\s*");
      if (splitLine.length != 2) {
        throw new ContractCaseCoreError(
            "Unable to start ContractCase internal server, first line wasn't in the expected format. Contents were: "
                + firstLine);
      }

      this.outputStreamSink = new ReaderSink(stdout);
      this.outputStreamSink.start();
      try {
        var portNumber = Integer.parseInt(splitLine[1]);
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Server started on port: " + portNumber);
        this.portNumber = portNumber;
      } catch (NumberFormatException e) {
        throw new ContractCaseCoreError(
            "Expected server response to contain a port, but was: " + firstLine);
      }

    } catch (final IOException ioe) {
      throw new UncheckedIOException(ioe);
    }

    this.shutdownHook = new Thread(this::terminate, "Terminate CaseConnector client");
    Runtime.getRuntime().addShutdownHook(this.shutdownHook);
  }

  synchronized void terminate() {
    // Todo: Tell child to exit

    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Exiting...");

    this.shutdownTriggered = true;

    // Cleaning up stdout (ensuring buffers are flushed, etc...)
    if (stdout != null) {
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Closing stdout...");
        stdout.close();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "...stdout closed");
      } catch (final IOException ioe) {
        // Ignore - the stream might have already been closed.
      } finally {
        stdout = null;
      }
    }

    if (childProcess != null) {
      // Wait for the child process to complete
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Closing server process...");
        childProcess.destroyForcibly();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "...server process killed");

      } finally {
        childProcess = null;
      }
    }

    // Cleaning up error stream sink (ensuring all messages are flushed, etc...)
    if (this.errorStreamSink != null) {
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Closing error stream...");
        this.errorStreamSink.close();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "...error stream closed");
      } catch (final InterruptedException ie) {
        // Ignore - we can no longer do anything about this...
      } finally {
        this.errorStreamSink = null;
      }
    }

    // Cleaning up error stream sink (ensuring all messages are flushed, etc...)
    if (this.outputStreamSink != null) {
      try {
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Closing output stream...");
        this.outputStreamSink.close();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "...output stream closed");
      } catch (final InterruptedException ie) {
        // Ignore - we can no longer do anything about this...
      } finally {
        this.outputStreamSink = null;
      }
    }

    // We shut down already, no need for the shutdown hook anymore
    if (this.shutdownHook != null) {
      try {
        Runtime.getRuntime().removeShutdownHook(this.shutdownHook);
      } catch (final IllegalStateException ise) {
        // VM Shutdown is in progress, removal is now impossible (and unnecessary)
      } finally {
        this.shutdownHook = null;
      }
    }
    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "...exited");
  }

  public synchronized int getPortNumber() {
    if (overridePort != 0) {
      return overridePort;
    }
    return portNumber;
  }

  /**
   * This code was borrowed from jsii. Their comments follow.
   * <p>
   * This {@link Thread} takes the standard error output from a child process and handles it
   * correctly as per the jsii runtime protocol. It is implemented in such a way that it is
   * interruptible, drawing inspiration from how it's done at zt-exec (so credits to ZeroTurnaround
   * & contributors).
   *
   * @see <a
   * href="https://github.com/zeroturnaround/zt-exec/blob/master/src/main/java/org/zeroturnaround/exec/stream/InputStreamPumper.java">zt-exec</a>
   */
  private static final class StreamSink extends Thread {

    private final InputStream inputStream;
    private final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    private boolean eof = false;
    private boolean stop = false;

    public StreamSink(final InputStream inputStream) {
      this.inputStream = inputStream;
      this.setDaemon(true);
      this.setName(this.getClass().getCanonicalName());
      this.setUncaughtExceptionHandler((thread, throwable) -> {
        System.err.printf(
            "Unexpected error in thread \"%s\": %s%n",
            thread.getName(),
            throwable
        );
      });
    }

    public void run() {
      try {
        while (!this.stop) {
          this.acceptData(false);
          if (!this.stop) {
            // Short interruptible sleep, so we can be stopped by a signal... This is a bit ugly (busy-waiting)
            // but is in fact the only way to be reliably interruptible with the InputStream API.
            Thread.sleep(100);
          }
        }
        // Finish flushing the stream until no data is left, so no log entries are dropped on the floor.
        this.acceptData(true);
      } catch (final IOException ioe) {
        if (!ioe.getMessage().equals("Stream closed")) {
          // This exception didn't occur during shutdown
          throw new UncheckedIOException(ioe);
        }
      } catch (
          final InterruptedException ie) {
        // Ignore - simply exit right away.
      }
    }

    public void close() throws InterruptedException {
      this.stop = true;
      this.join();
    }

    /**
     * Accepts data from {@link #inputStream} as long as data is available, or until EOF is reached
     * if the {@code uninterruptible} parameter is set to {@code true}.
     *
     * @param uninterruptible whether data should be read in a blocking manner until EOF is reached
     *                        or not.
     * @throws IOException if the underlying stream throws an IOException
     */
    private void acceptData(final boolean uninterruptible) throws IOException {
      while (!this.eof && (uninterruptible || this.inputStream.available() > 0)) {
        final int read = this.inputStream.read();
        if (read == -1) {
          this.eof = true;
        } else {
          this.buffer.write(read);
        }
        if (read == '\n' || this.eof) {
          processLine(buffer.toString(StandardCharsets.UTF_8));
          buffer.reset();
        }
      }
    }

    private void processLine(final String line) {
      System.err.println(line.replace("\n", ""));
    }
  }

  /**
   * This is like the {@link StreamSink}, but it works on readers. This code exists to protect
   * against the child process printing more than we're expecting.
   */
  private static final class ReaderSink extends Thread {

    private final BufferedReader reader;
    private final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    private boolean stop = false;

    public ReaderSink(final BufferedReader reader) {
      this.reader = reader;
      this.setDaemon(true);
      this.setName(this.getClass().getCanonicalName());
      this.setUncaughtExceptionHandler((thread, throwable) -> {
        System.err.printf(
            "Unexpected error in thread \"%s\": %s%n",
            thread.getName(),
            throwable
        );
      });
    }

    public void run() {
      try {
        while (!this.stop) {
          this.acceptData(false);
          if (!this.stop) {
            // Short interruptible sleep, so we can be stopped by a signal... This is a bit ugly (busy-waiting)
            // but is in fact the only way to be reliably interruptible with the InputStream API.
            Thread.sleep(100);
          }
        }
        // Finish flushing the stream until no data is left, so no log entries are dropped on the floor.
        this.acceptData(true);
      } catch (final IOException ioe) {
        if (!ioe.getMessage().equals("Stream closed")) {
          // This exception didn't occur during shutdown
          throw new UncheckedIOException(ioe);
        }
      } catch (
          final InterruptedException ie) {
        // Ignore - simply exit right away.
      }
    }

    public void close() throws InterruptedException {
      this.stop = true;
      this.join();
    }

    /**
     * Accepts data from {@link #reader} as long as data is available, or until EOF is reached if
     * the {@code uninterruptible} parameter is set to {@code true}.
     *
     * @param uninterruptible whether data should be read in a blocking manner until EOF is reached
     *                        or not.
     * @throws IOException if the underlying stream throws an IOException
     */
    private void acceptData(final boolean uninterruptible) throws IOException {
      if (this.reader.ready() || uninterruptible) {
        var line = this.reader.readLine();
        if (line != null) {
          processLine(line);
        }
      }
    }

    private void processLine(final String line) {
      System.err.println("Unexpected stdout: " + line.replace("\n", ""));
    }
  }

}
