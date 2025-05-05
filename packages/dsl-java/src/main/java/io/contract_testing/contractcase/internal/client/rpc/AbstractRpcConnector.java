package io.contract_testing.contractcase.internal.client.rpc;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.google.protobuf.AbstractMessage;
import com.google.protobuf.GeneratedMessageV3;
import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc.ContractCaseStub;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BoundaryResult;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import io.contract_testing.contractcase.internal.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.internal.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import io.contract_testing.contractcase.logs.LogPrinter;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import org.jetbrains.annotations.NotNull;

abstract class AbstractRpcConnector<T extends AbstractMessage, B extends GeneratedMessageV3.Builder<B>> {

  private final SendingWorker<T> worker;

  private final ManagedChannel channel;

  /**
   * Contains any registered functions that can be called back to by the core server.
   * <p/>
   * This should probably be moved somewhere other than the connector.
   */
  private final Map<String, ConnectorInvokableFunction> registeredFunctions = new ConcurrentHashMap<>();

  private final ResponseWaiter responseWaiter = new ResponseWaiter();

  /**
   * Prevents multiple sends being called at once. Now that there's a full {@link SendingWorker}
   * thread, this is probably unnecessary
   */
  private static final Semaphore sendMutex = new Semaphore(1);

  /**
   * Used to wait for the underlying workers to stop during shutdown. If this is zero, the workers
   * have closed, and the connection is ready to be shutdown.
   */
  protected final CountDownLatch finishLatch = new CountDownLatch(1);

  private static final int DEFAULT_TIMEOUT_SECONDS = 60;

  /**
   * Used to indicate that the overall connection has failed, and no more sending should happen. If
   * this is set, all further sends will return immediately with this value.
   */
  private volatile BoundaryResult failedResult;


  public AbstractRpcConnector(
      @NotNull LogPrinter logPrinter,
      @NotNull ConfigHandle configHandle,
      @NotNull RunTestCallback runTestCallback) {
    this.channel = ManagedChannelBuilder
        .forAddress("localhost", ContractCaseProcess.getInstance().getPortNumber())
        .defaultServiceConfig(readServiceConfig())
        .usePlaintext()
        .enableRetry()
        .build();
    this.worker = SendingWorker.create(createConnection(
        ContractCaseGrpc.newStub(channel),
        new ContractResponseStreamObserver<>(
            this,
            logPrinter,
            configHandle,
            runTestCallback
        )
    ));
  }

  protected Map<String, ?> readServiceConfig() {
    // Service config has a low initial retry, since we know we're on the same machine
    var resource = AbstractRpcConnector.class.getResourceAsStream(
        "service_config.json");

    if (resource == null) {
      throw new ContractCaseCoreError(
          "Unable to read the service config resource. This indicates that the ContractCase jar was built incorrectly.");
    }
    return new Gson()
        .fromJson(
            new JsonReader(
                new InputStreamReader(
                    resource,
                    UTF_8
                )),
            Map.class
        );
  }

  abstract StreamObserver<T> createConnection(ContractCaseStub asyncStub,
      ContractResponseStreamObserver<T, B> contractResponseStreamObserver);

  /**
   * Set the message ID on the kind of messages that this connector sends.
   * <p>
   * This exists so that we can share implementation between both the Definition and Verification
   * RPCs without needing to share types.
   *
   * @param builder The builder for the core message type of this connector
   * @param id      The ID to set
   * @return a built message, with the ID set appropriately
   */
  abstract T setId(B builder, StringValue id);

  /**
   * Make a message builder for a response message with the provided response.
   * <p>
   * This exists so that we can share implementation between both the Definition and Verification
   * RPCs without needing to share types.
   *
   * @param response The {@link ResultResponse} to attach.
   * @return A message builder with the provided {@link ResultResponse} already attached
   */
  abstract B makeResponse(ResultResponse response);

  /**
   * Make a message builder for an InvokeTest message with the provided invoker ID.
   * <p>
   * This exists so that we can share implementation between both the Definition and Verification
   * RPCs without needing to share types.
   *
   * @param invokerId The invoker identifier
   * @return A message of the invoke test type
   */
  abstract B makeInvokeTest(StringValue invokerId);

  /**
   * Make a message builder for an InvokeFunction message with the provided name and arguments.
   * <p>
   * This exists so that we can share implementation between both the Definition and Verification
   * RPCs without needing to share types.
   *
   * @param name The name of the function to invoke
   * @param args A json string of the arguments to pass
   * @return A message of the invoke test type
   */
  abstract B makeInvokeFunction(String name, List<String> args);

  /**
   * Executes a call to the core, and waits for the result. You don't need to set any ID on the
   * request, this function will generate an ID, and call {@link #setId(B, StringValue)} to set it.
   * <p>
   * This method doesn't actually do the sending, it defers to the worker. This method then blocks
   * until the response arrives. The timeout for this method is {@link #DEFAULT_TIMEOUT_SECONDS}
   *
   * @param builder A builder for the request to send
   * @param reason  A short debugging string that represents the reason for the call. This is
   *                prefixed to the generated ID.
   * @return the result returned from the core.
   */
  public ConnectorResult executeCallAndWait(B builder, String reason) {
    return this.executeCallAndWait(builder, reason, DEFAULT_TIMEOUT_SECONDS);
  }

  /**
   * Executes a call to the core, and waits for the result. You don't need to set any ID on the
   * request, this function will generate an ID, and call
   * {@link AbstractRpcConnector#setId(B, StringValue)} to set it.
   * <p>
   * This method doesn't actually do the sending, it defers to the worker. This method then blocks
   * until the response arrives.
   *
   * @param builder        A builder for the request to send
   * @param reason         A short debugging string that represents the reason for the call. This is
   *                       prefixed to the generated ID.
   * @param timeoutSeconds How long to wait in seconds before failing the call with a
   *                       CASE_CORE_ERROR or a CASE_CONFIGURATION_ERROR, based on a guess about
   *                       whether it was the main connection or a general timeout.
   * @return the result returned from the core.
   */
  public ConnectorResult executeCallAndWait(B builder, String reason, int timeoutSeconds) {
    if (failedResult != null) {
      // We've already failed, so we don't want to send anything
      return ConnectorIncomingMapper.mapBoundaryResult(failedResult);
    }

    var id = responseWaiter.createAwait(reason);

    worker.send(setId(builder, ConnectorOutgoingMapper.map(id)), LogLevel.MAINTAINER_DEBUG);

    return responseWaiter.awaitResponse(id, timeoutSeconds);
  }

  /**
   * Used when the core has an error to cancel all waiting callbacks.
   * <p>
   * If this method is called, it means there are no more responses coming, so we cancel all
   * in-flight messages.
   *
   * @param e the error to cancel them all with.
   */
  void cancelAll(ContractCaseCoreError e) {
    var result = ConnectorOutgoingMapper.mapResult(ConnectorExceptionMapper.map(e));
    this.failedResult = result;
    responseWaiter.cancelAll(result);
  }


  void completeWait(String requestId, BoundaryResult result) {
    responseWaiter.completeAwait(requestId, result);
  }


  void sendResponse(B builder, String id, LogLevel logLevel) {
    try {
      sendMutex.acquire();
    } catch (InterruptedException e) {
      throw new ContractCaseCoreError(
          "Interrupted while waiting to aquire the send mutex.\nIf this"
              + " happened without you killing the test run, then there"
              + " may be a threading bug in the ContractCase java DSL.");
    }
    try {

      worker.send(setId(builder, ConnectorOutgoingMapper.map(id)), logLevel);
    } finally {
      sendMutex.release();
    }
  }

  /**
   * Sends a response to the core
   *
   * @param response the actual response
   * @param id       The message being replied to
   * @param logLevel passed in so that the acknowledgement messages aren't logged, otherwise it's
   *                 very noisy. Either one of MAINTAINER_DEBUG in most cases, or
   *                 DEEP_MAINTAINER_DEBUG for noisest logs.
   */
  void sendResponse(ResultResponse response, String id, LogLevel logLevel) {
    sendResponse(makeResponse(response), id, logLevel);
  }


  public void close() {
    worker.close();
    try {
      finishLatch.await(5, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    try {
      this.channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  /**
   * Called by the user facing DSL to register functions that the core can call back.
   *
   * @param functionName The name (ie, handle) of the function that the Core can use as a callback
   * @param function     The actual function that can be invoked
   */
  public <R> void registerFunction(String functionName, ConnectorInvokableFunction function) {
    if (this.registeredFunctions.containsKey(functionName)) {
      throw new ContractCaseConfigurationError(
          "The function '"
              + "' was already registered. Make sure you are only registering it once.",
          "UNDOCUMENTED"
      );
    }
    this.registeredFunctions.put(functionName, function);
  }

  /**
   * Called by the core to invoke a user-provided function.
   *
   * @param functionName The name of the function
   * @param args         The arguments as strings
   * @return A {@link ConnectorResult} indicating the result of invoking the function.
   */
  ConnectorResult invokeFunction(String functionName, List<String> args) {
    var method = this.registeredFunctions.get(functionName);
    if (method == null) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "The core asked us to invoke the function '" + functionName
              + "' but it didn't exist in our store",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER,
          functionName,
          ""
      );
    }
    return method.apply(args);
  }

}