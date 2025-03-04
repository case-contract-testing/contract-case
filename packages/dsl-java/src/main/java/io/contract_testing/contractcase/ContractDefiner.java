package io.contract_testing.contractcase;

import io.contract_testing.contractcase.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.client.InternalDefinerClient;
import io.contract_testing.contractcase.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.definitions.mocks.base.AnyMockDescriptor;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper;
import io.contract_testing.contractcase.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import org.jetbrains.annotations.NotNull;

public class ContractDefiner {

  private static final String TEST_RUN_ID = "JAVA";
  private final InternalDefinerClient definer;
  private final ContractCaseConfig config;


  public ContractDefiner(final @NotNull ContractCaseConfig config) {
    ContractCaseProcess.getInstance().start();

    LogPrinter logPrinter = new LogPrinter();
    this.config = config;

    InternalDefinerClient definer = null;
    try {
      definer = new InternalDefinerClient(
          ConnectorConfigMapper.map(config, TEST_RUN_ID),
          logPrinter,
          new BoundaryVersionGenerator().getVersions()
      );
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    this.definer = definer;
  }

  public void endRecord() {
    ConnectorResultMapper.mapVoid(this.definer.endRecord());
  }

  public void loadPlugins(String... pluginNames) {
    try {
      ConnectorResultMapper.mapVoid(this.definer.loadPlugins(ConnectorConfigMapper.map(
          config,
          "DEFINER_LOAD_PLUGIN"
      ), pluginNames));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  public <T, M extends AnyMockDescriptor> void runInteraction(InteractionDefinition<M> definition,
      final @NotNull IndividualSuccessTestConfig<T> additionalConfig) {
    try {
      ConnectorResultMapper.mapVoid(definer.runInteraction(
          definition.toJSON(),
          ConnectorConfigMapper.mapSuccessExample(additionalConfig, TEST_RUN_ID)
      ));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  public <T, M extends AnyMockDescriptor> void runInteraction(InteractionDefinition<M> definition,
      final @NotNull IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder<T> additionalConfig) {
    this.runInteraction(definition, additionalConfig.build());
  }

  public <M extends AnyMockDescriptor> void runInteraction(InteractionDefinition<M> definition) {
    this.runInteraction(
        definition,
        IndividualSuccessTestConfig
            .IndividualSuccessTestConfigBuilder
            .builder()
            .build()
    );
  }

  public <T, M extends AnyMockDescriptor> void runThrowingInteraction(InteractionDefinition<M> definition,
      IndividualFailedTestConfig<T> additionalConfig) {
    try {
      ConnectorResultMapper.mapVoid(definer.runRejectingInteraction(
          definition.toJSON(),
          ConnectorConfigMapper.mapFailingExample(additionalConfig, TEST_RUN_ID)
      ));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  public <T, M extends AnyMockDescriptor> void runThrowingInteraction(InteractionDefinition<M> definition,
      IndividualFailedTestConfigBuilder<T> additionalConfig) {
    this.runThrowingInteraction(definition, additionalConfig.build());
  }

  public <M extends AnyMockDescriptor> void runThrowingInteraction(InteractionDefinition<M> definition) {
    this.runThrowingInteraction(
        definition,
        IndividualFailedTestConfig
            .IndividualFailedTestConfigBuilder
            .builder()
            .build()
    );
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
      ConnectorResultMapper.mapVoid(definer.registerFunction(
          functionName, connectorFunction
      ));
    } catch (Throwable e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }
}
