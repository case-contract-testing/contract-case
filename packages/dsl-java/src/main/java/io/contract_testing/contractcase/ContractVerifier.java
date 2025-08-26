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
import io.contract_testing.contractcase.internal.edge.RunTestCallback;
import io.contract_testing.contractcase.internal.edge.default_implementations.LogPrinterStandardOut;
import io.contract_testing.contractcase.logs.LogPrinter;
import java.util.List;

/**
 * Verifies one or more contracts against a single provider
 */
public class ContractVerifier implements AutoCloseable {

  private final InternalVerifierClient verifier;

  private final ContractCaseConfig config;

  public ContractVerifier(final ContractCaseConfig config) {
    this(config, new LogPrinterStandardOut());
  }

  /**
   * Creates a ContractVerifier with the provided configuration and LogPrinter
   *
   * @param config The configuration
   * @param logPrinter Implementation to use when printing logs
   * @param runTestCallback Ignored
   * @deprecated Deprecated as RunTestCallback is ignored
   */
  @Deprecated(since = "0.27.0", forRemoval = true)
  public ContractVerifier(ContractCaseConfig config,
      LogPrinter logPrinter, RunTestCallback runTestCallback) {
    this(config, logPrinter);
  }

  /**
   * Creates a ContractVerifier with the provided configuration.
   *
   * @param config The configuration
   * @param runTestCallback Ignored
   * @deprecated Deprecated as RunTestCallback is ignored
   */
  @Deprecated(since = "0.27.0", forRemoval = true)
  public ContractVerifier(final ContractCaseConfig config, RunTestCallback runTestCallback) {
    this(config, new LogPrinterStandardOut());
  }

  public ContractVerifier(final ContractCaseConfig config, LogPrinter logPrinter) {
    ContractCaseProcess.getInstance().start();
    this.config = config;

    InternalVerifierClient verification = null;
    try {
      verification = new InternalVerifierClient(
          ConnectorConfigMapper.map(
              config,
              "VERIFICATION"
          ),
          logPrinter,
          new BoundaryVersionGenerator().getVersions()
      );
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
          "VERIFICATION_LOAD_PLUGIN"
      ), pluginNames));
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
          }
      );
    } catch (Exception e) {
      throw BoundaryCrashReporter.report(e);
    }
  }

  /**
   * Runs a prepared test returned by {@link #prepareVerification()}. This method has the same
   * semantics as {@link #runVerification()}.
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

  /**
   * @param configOverrides the configuration to override what was initially set.
   * @deprecated Prefer preparing the list of tests with {@link #prepareVerification} and then
   * running each with {@link #runPreparedTest(VerificationTestHandle)} instead. This will be
   * removed in a future version.
   */
  @Deprecated
  public void runVerification(ContractCaseConfig configOverrides) {
    this.prepareVerification(configOverrides).forEach(this::runPreparedTest);
    this.close();
  }

  @Override
  public void close() {
    verifier.close();
  }

  public <E extends Exception> void registerFunction(String functionName,
      InvokableFunction0<E> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction1<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction2<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction3<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction4<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction5<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction6<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
  }

  public void registerFunction(String functionName, InvokableFunction7<?> function) {
    registerFunctionInternal(functionName, ConnectorInvokableFunctionMapper.fromInvokableFunction(
        functionName,
        function
    ));
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
