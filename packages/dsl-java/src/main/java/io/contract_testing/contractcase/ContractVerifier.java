package io.contract_testing.contractcase;

import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.client.InternalVerifierClient;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.edge.BasicRunTestCallback;
import io.contract_testing.contractcase.edge.BoundaryCrashReporter;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.edge.ConnectorResult;
import java.util.List;

public class ContractVerifier implements AutoCloseable {

  private final InternalVerifierClient verifier;


  private final ContractCaseConfig config;
  private final BasicRunTestCallback runTestCallback;

  public ContractVerifier(final ContractCaseConfig config) {
    LogPrinter logPrinter = new LogPrinter();
    ContractCaseProcess.getInstance().start();
    this.config = config;

    InternalVerifierClient verification = null;
    runTestCallback = new BasicRunTestCallback();
    try {
      verification = new InternalVerifierClient(
          ConnectorConfigMapper.map(
              config,
              "VERIFICATION"
          ),
          runTestCallback,
          logPrinter,
          new BoundaryVersionGenerator().getVersions()
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
    var failures = runTestCallback.getFailures();
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
