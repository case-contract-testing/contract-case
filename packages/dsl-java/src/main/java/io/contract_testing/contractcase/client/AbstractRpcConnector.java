package io.contract_testing.contractcase.client;

import com.google.protobuf.AbstractMessage;
import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.ContractCaseCoreError;
import io.contract_testing.contractcase.LogPrinter;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.edge.ConnectorFailure;
import io.contract_testing.contractcase.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.edge.ConnectorResult;
import io.contract_testing.contractcase.edge.RunTestCallback;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc;
import io.contract_testing.contractcase.grpc.ContractCaseGrpc.ContractCaseStub;
import io.contract_testing.contractcase.grpc.ContractCaseStream.BoundaryResult;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;
import org.jetbrains.annotations.NotNull;

abstract class AbstractRpcConnector<T extends AbstractMessage, B extends GeneratedMessage.Builder<B>> {

  private final ConcurrentMap<String, CompletableFuture<BoundaryResult>> responseFutures = new ConcurrentHashMap<>();
  private final AtomicInteger nextId = new AtomicInteger();
  private final SendingWorker<T> worker;
  private Status errorStatus;

  private ManagedChannel channel;

  private static final int DEFAULT_TIMEOUT_SECONDS = 60;


  public AbstractRpcConnector(
      @NotNull LogPrinter logPrinter,
      @NotNull ConfigHandle configHandle,
      @NotNull RunTestCallback runTestCallback) {
    this.channel = ManagedChannelBuilder
        .forAddress("localhost", ContractCaseProcess.getInstance().getPortNumber())
        .usePlaintext()
        .build();
    this.worker = new SendingWorker<T>(createConnection(
        ContractCaseGrpc.newStub(channel),
        new ContractResponseStreamObserver<>(
            this,
            logPrinter,
            configHandle,
            runTestCallback
        )
    ));
  }

  abstract StreamObserver<T> createConnection(ContractCaseStub asyncStub,
      ContractResponseStreamObserver<T, B> contractResponseStreamObserver);

  abstract T setId(B builder, StringValue id);

  abstract B makeResponse(ResultResponse response);

  abstract B makeInvokeTest(StringValue invokerId);

  ConnectorResult executeCallAndWait(B builder, String reason) {
    return this.executeCallAndWait(builder, reason, DEFAULT_TIMEOUT_SECONDS);
  }

  ConnectorResult executeCallAndWait(B builder, String reason, int timeoutSeconds) {
    final var id =
        "[" + reason + " " + nextId.getAndIncrement() + " " + Thread.currentThread().getName()
            + "]";
    if (errorStatus != null) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
          "ContractCase's internal connection failed before execution: " + errorStatus,
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }

    var future = new CompletableFuture<BoundaryResult>();
    responseFutures.put(id, future);
    worker.send(setId(builder, ConnectorOutgoingMapper.map(id)));

    try {
      MaintainerLog.log("Waiting for: " + id);
      var mappedResult = ConnectorIncomingMapper.mapBoundaryResult(future.get(
          timeoutSeconds,
          TimeUnit.SECONDS
      ));

      if (errorStatus != null) {
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "ContractCase's internal connection failed while waiting for a request '" + id + "':"
                + errorStatus,
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
        );
      }

      return mappedResult;
    } catch (TimeoutException e) {
      MaintainerLog.log("Timed out waiting for: " + id);
      MaintainerLog.log("Remaining futures: " + responseFutures.keySet());

      if (errorStatus != null) {
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "ContractCase's internal connection failed while waiting for a request '" + id + "':"
                + errorStatus,
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
        );
      }
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
          "Timed out waiting for internal connection to ContractCase for message '" + id + "'",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    } catch (ExecutionException e) {
      MaintainerLog.log("Execution exception waiting for: " + id + "\n" + e);
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "Failed waiting for a response '" + id + "':" + e.getMessage(),
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    } catch (InterruptedException e) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
          "ContractCase was interrupted during its run. This isn't really a configuration error, it usually happens if a user killed the run.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
  }

  void completeWait(String id, BoundaryResult result) {
    MaintainerLog.log(
        "Completing wait for id '" + id + "', with result: " + result.getValueCase().name());

    final var future = responseFutures.get(id);
    if (future == null) {
      throw new ContractCaseCoreError(
          "There was no future with id '" + id
              + "'. This is a bug in the wrapper or the boundary.",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
    responseFutures.get(id).complete(result);
    responseFutures.remove(id);
  }

  private static final Semaphore sendMutex = new Semaphore(1);

  void sendResponse(B builder, String id) {
    try {
      sendMutex.acquire();
    } catch (InterruptedException e) {
      throw new ContractCaseCoreError(
          "Interrupted while waiting to aquire the send mutex.\nIf this"
              + " happened without you killing the test run, then there"
              + " may be a threading bug in the ContractCase java DSL.");
    }
    try {

      worker.send(setId(builder, ConnectorOutgoingMapper.map(id)));
    } finally {
      sendMutex.release();
    }
  }

  void sendResponse(ResultResponse response, String id) {
    sendResponse(makeResponse(response), id);
  }

  public void setErrorStatus(Status errorStatus) {
    this.errorStatus = errorStatus;
  }

  public void close() {
    worker.close();
    this.channel.shutdown();
  }


}