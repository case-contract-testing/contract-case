package io.contract_testing.contractcase;

import com.fasterxml.jackson.core.type.TypeReference;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.ContractDescription;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.client.InternalVerifierClient;
import io.contract_testing.contractcase.internal.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.internal.edge.BoundaryCrashReporter;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.internal.edge.ConnectorResult;
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import io.contract_testing.contractcase.internal.edge.default_implementations.BasicRunTestCallback;
import io.contract_testing.contractcase.internal.edge.default_implementations.LogPrinterStandardOut;
import io.contract_testing.contractcase.logs.LogPrinter;
import java.util.List;

/**
 * Verifies one or more contracts against a single provider
 */
public class ContractVerifier implements AutoCloseable {

  private final InternalVerifierClient verifier;

  private final ContractCaseConfig config;
  private final RunTestCallback runTestCallback;

  public ContractVerifier(final ContractCaseConfig config) {
    this(config, new LogPrinterStandardOut(), new BasicRunTestCallback());
  }

  public ContractVerifier(final ContractCaseConfig config, RunTestCallback runTestCallback) {
    this(config, new LogPrinterStandardOut(), runTestCallback);
  }

  public ContractVerifier(final ContractCaseConfig config, LogPrinter logPrinter) {
    this(config, logPrinter, new BasicRunTestCallback());
  }

  public ContractVerifier(ContractCaseConfig config,
      LogPrinter logPrinter, RunTestCallback runTestCallback) {
    ContractCaseProcess.getInstance().start();
    this.config = config;

    InternalVerifierClient verification = null;
    this.runTestCallback = runTestCallback;
    try {
      verification = new InternalVerifierClient(
          ConnectorConfigMapper.map(
              config,
              "VERIFICATION"),
          runTestCallback,
          logPrinter,
          new BoundaryVersionGenerator().getVersions());
    } catch (Exception e) {
      // TODO: Move this setup to outside the constructor, safer not to throw in the
      // constructor.
      throw BoundaryCrashReporter.report(e);
    }
    this.verifier = verification;
  }

  public void loadPlugins(String... pluginNames) {
    try {
      ConnectorResultMapper.mapVoid(this.verifier.loadPlugins(ConnectorConfigMapper.map(
          config,
          "VERIFICATION_LOAD_PLUGIN"), pluginNames));
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

  public List<ContractDescription> availableContractDescriptions() {
    try {
      return ConnectorResultMapper.mapListAvailableContracts(this.verifier.availableContractDescriptions());
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

  public void runVerification() {
    this.runVerification(ContractCaseConfigBuilder.aContractCaseConfig().build());
  }

  public List<VerificationTestHandle> prepareVerification() {
    return this.prepareVerification(ContractCaseConfigBuilder.aContractCaseConfig().build());
  }

  public List<VerificationTestHandle> prepareVerification(ContractCaseConfig configOverrides) {
    try {
      return ConnectorResultMapper.mapSuccessWithAny(
          this.verifier.prepareVerification(
              ConnectorConfigMapper.map(configOverrides, "VERIFICATION")),
          new TypeReference<List<VerificationTestHandle>>() {
          });
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

  /**
   * Runs a prepared test returned by {@link #prepareVerification()}.
   * This method has the same semantics as {@link #runVerification()}.
   *
   * @param testHandle - the test to run
   */
  public void runPreparedTest(VerificationTestHandle testHandle) {
    try {
      ConnectorResultMapper.mapVoid(
          this.verifier.runPreparedTest(testHandle));
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

  public void runVerification(ContractCaseConfig configOverrides) {
    try {
      ConnectorResultMapper.mapVoid(this.verifier.runVerification(
          ConnectorConfigMapper.map(configOverrides, "VERIFICATION")));
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
    var failures = runTestCallback.getFailures();
    if (!failures.isEmpty()) {
      try {
        ConnectorResultMapper.mapVoid(ConnectorResult.toConnectorResult(failures.get(0)));
      } catch (Exception e) {
        throw BoundaryCrashReporter.report(e);
      }
    }
  }

  @Override
  public void close() {
    verifier.close();
  }

  public <E extends Exception> void registerFunction(String functionName,
      InvokableFunction0<E> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction1<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction2<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction3<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction4<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction5<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction6<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  public void registerFunction(String functionName, InvokableFunction7<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function));
  }

  private void registerFunctionInternal(String functionName,
      ConnectorInvokableFunction<?> connectorFunction) {
    try {
      ConnectorResultMapper.mapVoid(verifier.registerFunction(
          functionName, connectorFunction));
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

}
