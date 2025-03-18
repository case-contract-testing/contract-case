package io.contract_testing.contractcase.client;

import com.google.protobuf.AbstractMessage;
import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.GeneratedMessage.Builder;
import com.google.protobuf.GeneratedMessageV3;
import com.google.protobuf.StringValue;
import io.contract_testing.contractcase.ContractCaseConfigurationError;
import io.contract_testing.contractcase.ContractCaseCoreError;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.LogPrinter;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.edge.ConnectorFailure;
import io.contract_testing.contractcase.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
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
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;
import org.jetbrains.annotations.NotNull;

abstract class AbstractRpcConnector<T extends AbstractMessage, B extends GeneratedMessageV3.Builder<B>> {

  private final ConcurrentMap<String, CompletableFuture<BoundaryResult>> responseFutures = new ConcurrentHashMap<>();
  private final AtomicInteger nextId = new AtomicInteger();
  private final SendingWorker<T> worker;
  private Status errorStatus;

  private final ManagedChannel channel;

  final CountDownLatch finishLatch = new CountDownLatch(1);
  private final Map<String, ConnectorInvokableFunction> registeredFunctions = new ConcurrentHashMap<>();


  private static final int DEFAULT_TIMEOUT_SECONDS = 60;


  public AbstractRpcConnector(
      @NotNull LogPrinter logPrinter,
      @NotNull ConfigHandle configHandle,
      @NotNull RunTestCallback runTestCallback) {
    this.channel = ManagedChannelBuilder
        .forAddress("localhost", ContractCaseProcess.getInstance().getPortNumber())
        .usePlaintext()
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

  abstract StreamObserver<T> createConnection(ContractCaseStub asyncStub,
      ContractResponseStreamObserver<T, B> contractResponseStreamObserver);

  abstract T setId(B builder, StringValue id);

  abstract B makeResponse(ResultResponse response);

  abstract B makeInvokeTest(StringValue invokerId);

  abstract B makeInvokeFunction(String name, List<String> args);

  /**
   * Executes a call to the core, and waits for the result. You don't need to set any ID on the
   * request, this function will generate an ID, and call {@link #setId(Builder, StringValue)} to
   * set it.
   * <p>
   * This method doesn't actually do the sending, it defers to the worker. This method then blocks
   * until the response arrives. The timeout for this method is {@link #DEFAULT_TIMEOUT_SECONDS}
   *
   * @param builder A builder for the request to send
   * @param reason  A short debugging string that represents the reason for the call. This is
   *                prefixed to the generated ID.
   * @return the result returned from the core.
   */
  ConnectorResult executeCallAndWait(B builder, String reason) {
    return this.executeCallAndWait(builder, reason, DEFAULT_TIMEOUT_SECONDS);
  }

  /**
   * Executes a call to the core, and waits for the result. You don't need to set any ID on the
   * request, this function will generate an ID, and call {@link #setId(Builder, StringValue)} to
   * set it.
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
    worker.send(setId(builder, ConnectorOutgoingMapper.map(id)), LogLevel.MAINTAINER_DEBUG);

    try {
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Waiting for: " + id);
      var mappedResult = ConnectorIncomingMapper.mapBoundaryResult(future.get(
          timeoutSeconds * (long) 1000,
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
      MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Timed out waiting for: " + id);
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Remaining futures: " + responseFutures.keySet()
      );

      if (errorStatus != null) {
        return new ConnectorFailure(
            ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR,
            "ContractCase's internal connection failed while waiting for a request '" + id + "':"
                + errorStatus,
            MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
        );
      }
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
    responseFutures.remove(id);
  }

  private static final Semaphore sendMutex = new Semaphore(1);

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

  void sendResponse(ResultResponse response, String id, LogLevel logLevel) {
    sendResponse(makeResponse(response), id, logLevel);
  }

  public void setErrorStatus(Status errorStatus) {
    this.errorStatus = errorStatus;
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


  public <R> void registerFunction(String functionName, ConnectorInvokableFunction function) {
    if (this.registeredFunctions.containsKey(functionName)) {
      throw new ContractCaseConfigurationError("The function '"
          + "' was already registered. Make sure you are only registering it once.");
    }
    this.registeredFunctions.put(functionName, function);
  }

  public ConnectorResult invokeFunction(String functionName, List<String> args) {
    var method = this.registeredFunctions.get(functionName);
    if (method == null) {
      return new ConnectorFailure(
          ConnectorFailureKindConstants.CASE_CORE_ERROR,
          "The core asked us to invoke the function '" + functionName
              + "' but it didn't exist in our store",
          MaintainerLog.CONTRACT_CASE_JAVA_WRAPPER
      );
    }
    return method.apply(args);
  }

}