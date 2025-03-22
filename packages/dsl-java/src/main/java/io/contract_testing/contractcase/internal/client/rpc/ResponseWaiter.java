package io.contract_testing.contractcase.internal.client.rpc;

import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.internal.client.MaintainerLog;
import io.contract_testing.contractcase.internal.edge.ConnectorFailure;
import io.contract_testing.contractcase.internal.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BoundaryResult;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;

public class ResponseWaiter {

  private final ConcurrentMap<String, CompletableFuture<BoundaryResult>> responseFutures = new ConcurrentHashMap<>();

  private final AtomicInteger nextId = new AtomicInteger();


  String createAwait(String reason) {
    final var id =
        "[" + reason + " " + nextId.getAndIncrement() + " " + Thread.currentThread().getName()
            + "]";


    var future = new CompletableFuture<BoundaryResult>();
    responseFutures.put(id, future);
    return id;
  }

  /**
   * Used when the core has an error to cancel all waiting callbacks.
   * <p>
   * If this method is called, it means there are no more responses coming, so we cancel all
   * in-flight messages.
   *
   * @param result the error to cancel them all with.
   */
  void cancelAll(BoundaryResult result) {
    this.responseFutures.forEach((key, value) -> {
      value.complete(result);
    });
  }

  ConnectorResult awaitResponse(String id, int timeoutSeconds) {
    var future = responseFutures.get(id);

    if(future == null) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "Message '" + id + "' wasn't in the response futures map. This shouldn't happen, and is a bug with the Java DSL",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }

    try {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Waiting for: " + id);
      return ConnectorIncomingMapper.mapBoundaryResult(future.get(
          timeoutSeconds * (long) 1000,
          TimeUnit.SECONDS
      ));
    } catch (TimeoutException e) {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Timed out waiting for: " + id);
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Remaining futures: " + responseFutures.keySet()
      );

      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "Timed out waiting for internal connection to ContractCase for message '" + id + "'",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    } catch (ExecutionException e) {
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Execution exception waiting for: " + id + "\n" + e
      );
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "Failed waiting for a response '" + id + "':" + e.getMessage()  + "\n" + "Caused by: " + e.getCause(),
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    } catch (InterruptedException e) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
          "ContractCase was interrupted during its run. This isn't really a configuration error, it usually happens if a user killed the run.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    } finally {
      responseFutures.remove(id);
    }
  }

  /**
   * Completes a wait (which is happening elsewhere) for a response.
   * <p>
   * Note: We map between {@link BoundaryResult} and {@link ConnectorResult} inside {@link #awaitResponse)} because that way any errors that come from mapping
   * will be propagated.
   *
   * @param id The ID of the response that's waiting (previously created with {@link #createAwait}
   * @param result The BoundaryResult to complete with.
   */

  void completeAwait(String id, BoundaryResult result) {
    MaintainerLog.log(
        LogLevel.MAINTAINER_DEBUG,
        "Completing wait for id '" + id + "', with result: " + result.getValueCase().name()
    );

    final var future = responseFutures.get(id);
    if (future == null) {
      throw new ContractCaseCoreError(
          "There was no future with id '" + id
              + "'. This is a bug in the wrapper or the boundary.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
    responseFutures.get(id).complete(result);
  }
}
