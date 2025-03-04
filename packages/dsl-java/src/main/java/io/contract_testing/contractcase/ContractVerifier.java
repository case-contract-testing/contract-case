package io.contract_testing.contractcase;

import static io.contract_testing.contractcase.BoundaryCrashReporter.CRASH_MESSAGE_END;
import static io.contract_testing.contractcase.BoundaryCrashReporter.CRASH_MESSAGE_START;

import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.client.InternalVerifierClient;
import io.contract_testing.contractcase.client.MaintainerLog;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.edge.ConnectorExceptionMapper;
import io.contract_testing.contractcase.edge.ConnectorFailure;
import io.contract_testing.contractcase.edge.ConnectorFailureKindConstants;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.edge.ConnectorResult;
import io.contract_testing.contractcase.edge.ConnectorResultTypeConstants;
import io.contract_testing.contractcase.edge.InvokeCoreTest;
import io.contract_testing.contractcase.edge.RunTestCallback;
import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.NotNull;

public class ContractVerifier implements AutoCloseable {

  private final InternalVerifierClient verifier;

  private final List<ConnectorFailure> failures = new ArrayList<>();
  private final ContractCaseConfig config;

  public ContractVerifier(final ContractCaseConfig config) {
    LogPrinter logPrinter = new LogPrinter();
    ContractCaseProcess.getInstance().start();
    this.config = config;

    InternalVerifierClient verification = null;
    try {
      verification = new InternalVerifierClient(
          ConnectorConfigMapper.map(config, "VERIFICATION"),
          // TODO: Move the runTestCallback into the internals, maybe?
          new RunTestCallback() {
            @Override
            public @NotNull ConnectorResult runTest(@NotNull String testName,
                @NotNull InvokeCoreTest invoker) {
              // TODO replace this with something that knows about JUnit
              try {
                MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "Invoking verifier for: " + testName);
                var result = invoker.verify();

                // TODO: Replace this with something that knows what to do with these results
                if (result.getResultType().equals(ConnectorResultTypeConstants.RESULT_SUCCESS)) {
                  MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
                  MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[SUCCESS] " + testName);
                  MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");

                } else {
                  var failure = ((ConnectorFailure) result);
                  failures.add(failure);
                  var kind = failure.getKind();
                  if (kind.equals(ConnectorFailureKindConstants.CASE_CORE_ERROR)) {
                    System.err.println(
                        CRASH_MESSAGE_START
                            + "\n\n"
                            + failure.getMessage()
                            + "\n"
                            + failure.getLocation()
                            + "\n\n"
                            + CRASH_MESSAGE_END);
                  } else if (kind.equals(ConnectorFailureKindConstants.CASE_CONFIGURATION_ERROR)) {
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[CONFIGURATION ERROR] " + failure.getMessage());
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
                  } else {
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "[OTHER ERROR] " + failure.getMessage());
                    MaintainerLog.log(LogLevel.MAINTAINER_DEBUG, "");
                  }
                }
                return result;
              } catch (Exception e) {
                return ConnectorExceptionMapper.map(e);
              }
            }

          }, logPrinter, new BoundaryVersionGenerator().getVersions()
      );
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    this.verifier = verification;
  }

  public void loadPlugins(String... pluginNames) {
    try {
      ConnectorResultMapper.mapVoid(this.verifier.loadPlugins(ConnectorConfigMapper.map(
          config,
          "VERIFICATION_LOAD_PLUGIN"
      ), pluginNames));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  public List<ContractDescription> availableContractDescriptions() {
    try {
      return ConnectorResultMapper.mapListAvailableContracts(this.verifier.availableContractDescriptions());
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
      // This is actually unreachable, since the above method always throws
      return List.of();
    }
  }

  public void runVerification(ContractCaseConfig configOverrides) {
    try {
      ConnectorResultMapper.mapVoid(this.verifier.runVerification(
          ConnectorConfigMapper.map(configOverrides, "VERIFICATION")));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    if (!failures.isEmpty()) {
      try {
        ConnectorResultMapper.mapVoid(ConnectorResult.toConnectorResult(failures.get(0)));
      } catch (Throwable e) {
        BoundaryCrashReporter.handleAndRethrow(e);
      }

    }
  }

  @Override
  public void close() {
    verifier.close();
  }


  public void registerFunction(String functionName, InvokableFunction0 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction1 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction2 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction3 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction4 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction5 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction6 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction7 function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  private void registerFunctionInternal(String functionName,
      ConnectorInvokableFunction connectorFunction) {
    try {
      ConnectorResultMapper.mapVoid(verifier.registerFunction(
          functionName, connectorFunction
      ));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }
}
