package io.contract_testing.contractcase.client;

import static io.contract_testing.contractcase.client.ConnectorIncomingMapper.mapMatchErrorRequest;
import static io.contract_testing.contractcase.client.ConnectorIncomingMapper.mapMessageErrorRequest;
import static io.contract_testing.contractcase.client.ConnectorIncomingMapper.mapPrintableTestTitle;
import static io.contract_testing.contractcase.client.ConnectorOutgoingMapper.mapResult;
import static io.contract_testing.contractcase.client.ConnectorOutgoingMapper.mapResultResponse;

import com.google.protobuf.AbstractMessage;
import com.google.protobuf.GeneratedMessage;
import com.google.protobuf.GeneratedMessageV3;
import io.contract_testing.contractcase.ContractCaseCoreError;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.LogPrinter;
import io.contract_testing.contractcase.edge.ConnectorResult;
import io.contract_testing.contractcase.edge.ConnectorStateHandler;
import io.contract_testing.contractcase.edge.ConnectorSuccess;
import io.contract_testing.contractcase.edge.RunTestCallback;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractResponse;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ContractResponse.KindCase;
import io.contract_testing.contractcase.grpc.ContractCaseStream.ResultResponse;
import io.contract_testing.contractcase.grpc.ContractCaseStream.StateHandlerHandle.Stage;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import java.util.Set;
import org.jetbrains.annotations.NotNull;

class ContractResponseStreamObserver<T extends AbstractMessage, B extends GeneratedMessageV3.Builder<B>> implements
    StreamObserver<ContractResponse> {

  private final AbstractRpcConnector<T, B> rpcConnector;
  private final LogPrinter logPrinter;
  private final ConfigHandle configHandle;
  private final RunTestCallback runTestCallback;
  private final CrashPrintingExecutor executor;


  public ContractResponseStreamObserver(
      final @NotNull AbstractRpcConnector<T, B> rpcConnector,
      final @NotNull LogPrinter logPrinter,
      final @NotNull ConfigHandle configHandle,
      final @NotNull RunTestCallback runTestCallback) {
    this.rpcConnector = rpcConnector;
    this.logPrinter = logPrinter;
    this.configHandle = configHandle;
    this.runTestCallback = runTestCallback;
    this.executor = new CrashPrintingExecutor(); // Executors.newCachedThreadPool();
  }


  final Set<KindCase> NO_LOG = Set.of(
      KindCase.LOG_REQUEST,
      KindCase.PRINT_MATCH_ERROR_REQUEST,
      KindCase.PRINT_MESSAGE_ERROR_REQUEST,
      KindCase.PRINT_TEST_TITLE_REQUEST
  );

  @Override
  public void onNext(final ContractResponse coreResponse) {
    /* For when we receive messages from the server */
    final var requestId = ConnectorIncomingMapper.map(coreResponse.getId());
    final var kind = coreResponse.getKindCase();
    if (!NO_LOG.contains(kind)) {
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Received id(" + requestId + "), which was: " + coreResponse
      );
    }
    switch (coreResponse.getKindCase()) {
      case RUN_STATE_HANDLER -> {
        final var stateHandlerRunRequest = coreResponse.getRunStateHandler();
        var stateName = stateHandlerRunRequest.getStateHandlerHandle()
            .getHandle()
            .getValue();
        var handle = configHandle.getStateHandler(
            stateName);

        rpcConnector.sendResponse(
            ResultResponse.newBuilder()
                .setResult(mapResult(ConnectorResult.fromConnectorResult(runStateHandler(
                    stateHandlerRunRequest.getStateHandlerHandle()
                        .getStage(),
                    stateName,
                    handle
                )))).build(),
            requestId,
            LogLevel.MAINTAINER_DEBUG
        );
      }
      case LOG_REQUEST -> {
        final var logRequest = coreResponse.getLogRequest();
        logPrinter.log(
            ConnectorIncomingMapper.map(logRequest.getLevel()),
            ConnectorIncomingMapper.map(logRequest.getTimestamp()),
            ConnectorIncomingMapper.map(logRequest.getVersion()),
            ConnectorIncomingMapper.map(logRequest.getTypeString()),
            ConnectorIncomingMapper.map(logRequest.getLocation()),
            ConnectorIncomingMapper.map(logRequest.getMessage()),
            ConnectorIncomingMapper.map(logRequest.getAdditional())
        );
        rpcConnector.sendResponse(
            ResultResponse.newBuilder().setResult(
                mapResult(
                    new ConnectorSuccess()
                )
            ).build(),
            requestId, LogLevel.DEEP_MAINTAINER_DEBUG
        );
      }
      case PRINT_MATCH_ERROR_REQUEST -> {
        final var printMatchErrorRequest = coreResponse.getPrintMatchErrorRequest();
        logPrinter.printMatchError(
            mapMatchErrorRequest(printMatchErrorRequest)
        );
        rpcConnector.sendResponse(
            mapResultResponse(
                new ConnectorSuccess()
            ),
            requestId, LogLevel.DEEP_MAINTAINER_DEBUG
        );
      }
      case PRINT_MESSAGE_ERROR_REQUEST -> {
        logPrinter.printMessageError(
            mapMessageErrorRequest(
                coreResponse.getPrintMessageErrorRequest()
            )
        );
        rpcConnector.sendResponse(
            mapResultResponse(
                new ConnectorSuccess()
            ),
            requestId, LogLevel.DEEP_MAINTAINER_DEBUG
        );
      }
      case PRINT_TEST_TITLE_REQUEST -> {
        final var printTestTitleRequest = coreResponse.getPrintTestTitleRequest();
        logPrinter.printTestTitle(
            mapPrintableTestTitle(printTestTitleRequest));
        rpcConnector.sendResponse(
            mapResultResponse(new ConnectorSuccess()),
            requestId,
            LogLevel.DEEP_MAINTAINER_DEBUG
        );
      }
      case TRIGGER_FUNCTION_REQUEST -> {
        var triggerFunctionRequest = coreResponse.getTriggerFunctionRequest();
        var handle = ConnectorIncomingMapper.map(triggerFunctionRequest.getTriggerFunction()
            .getHandle());
        if (handle == null) {
          throw new ContractCaseCoreError(
              "Received a trigger request message with a null trigger handle",
              "Java Internal Connector"
          );
        }

        executor.submit(() ->
            rpcConnector.sendResponse(
                ResultResponse.newBuilder().setResult(
                    mapResult(
                        ConnectorResult.fromConnectorResult(
                            configHandle.getTriggerFunction(handle)
                                .trigger(ConnectorIncomingMapper.map(
                                        triggerFunctionRequest.getSetup(),
                                        (name, args) -> rpcConnector.executeCallAndWait(
                                            rpcConnector.makeInvokeFunction(
                                                name,
                                                args
                                            ), "Invoking function '" + name + "' in core")
                                    )
                                ))
                    )
                ).build(),
                requestId, LogLevel.NONE
            ));
      }
      case RESULT_RESPONSE -> {
        rpcConnector.completeWait(requestId, coreResponse.getResultResponse().getResult());
      }
      case START_TEST_EVENT -> {
        var startTestEvent = coreResponse.getStartTestEvent();
        var testName = startTestEvent.getTestName().getValue();
        executor.submit(() -> rpcConnector.sendResponse(
            mapResultResponse(
                runTestCallback.runTest(
                    testName,
                    () -> rpcConnector.executeCallAndWait(
                        rpcConnector.makeInvokeTest(
                            startTestEvent.getInvokerId()), "invokeTest")
                )
            ),
            requestId, LogLevel.MAINTAINER_DEBUG
        ));
      }
      case INVOKE_FUNCTION -> {
        var invokeFunctionEvent = coreResponse.getInvokeFunction();

        var handle = invokeFunctionEvent.getHandle().getValue();
        var args = invokeFunctionEvent.getArgumentsList()
            .stream()
            .map(ConnectorIncomingMapper::map).toList();
        MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Invoking a function");
        executor.submit(() -> {
          MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Processing invocation");
          rpcConnector.sendResponse(
              mapResultResponse(rpcConnector.invokeFunction(
                  handle, args
              ))
              , requestId, LogLevel.MAINTAINER_DEBUG);
        });
      }
      case KIND_NOT_SET -> {
        throw new ContractCaseCoreError(
            "Received a message with no kind set",
            "Java Internal Connector"
        );
      }
    }
  }

  @Override
  public void onError(final Throwable t) {
    try {
      Status status = Status.fromThrowable(t);
      if (Status.Code.UNAVAILABLE.equals(status.getCode())) {
        System.err.println("""
            ContractCase was unable to contact its internal server.
               This is either a conflict while starting the server,
               a crash while the server was running, or a bug in
               ContractCase.
               
               \n
               There may be additional context in the rest of
               the log output.
               
               --- Error message is ---
               """
            + "   " + t.getMessage() + """
               ------------------------
               \n
               If you are unable to resolve this locally, or if
               you suspect a bug, please open an issue here:
               \n
               https://github.com/case-contract-testing/contract-case/issues/new
            """);
      } else {
        System.err.println("ContractCase failed: " + status);
        t.printStackTrace();
      }

      rpcConnector.setErrorStatus(status);
      executor.close();
    } finally {
      rpcConnector.finishLatch.countDown();
    }
  }

  @Override
  public void onCompleted() {
    try {
      MaintainerLog.log(
          LogLevel.MAINTAINER_DEBUG,
          "Closing listener and pool as the stream completed"
      );
      executor.close();
    } finally {
      rpcConnector.finishLatch.countDown();
    }
  }

  @NotNull
  private static ConnectorResult runStateHandler(Stage stage,
      String stateName,
      ConnectorStateHandler handle) {
    return switch (stage) {
      case STAGE_SETUP_UNSPECIFIED -> handle.setup();
      case STAGE_TEARDOWN -> handle.teardown();
      case UNRECOGNIZED -> throw new ContractCaseCoreError(
          "Unrecognised state handler stage while trying to run '" + stateName +
              "'");
    };
  }
}
