package io.contract_testing.contractcase.internal.client.rpc;

import io.contract_testing.contractcase.internal.edge.BoundaryCrashReporter;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class CrashPrintingExecutor implements AutoCloseable {


  private final ExecutorService executor;

  CrashPrintingExecutor() {
    this.executor = Executors.newCachedThreadPool();
  }

  public Future<?> submit(Runnable task) {
    return executor.submit(() -> {
      try {
        task.run();
      } catch (Exception e) {
        BoundaryCrashReporter.printCrashMessage(e);
      }
    });
  }


  @Override
  public void close() {
    // In Java 17, executor.close() doesn't exist
    this.executor.shutdown();
  }
}
