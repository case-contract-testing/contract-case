package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction0;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction2;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction3;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction4;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction5;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction6;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction7;
import io.contract_testing.contractcase.definitions.interactions.base.AnyInteractionDescriptor;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.client.InternalDefinerClient;
import io.contract_testing.contractcase.internal.client.server.ContractCaseProcess;
import io.contract_testing.contractcase.internal.edge.BoundaryCrashReporter;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorInvokableFunctionMapper.ConnectorInvokableFunction;
import io.contract_testing.contractcase.internal.edge.default_implementations.LogPrinterStandardOut;
import io.contract_testing.contractcase.logs.LogPrinter;
import org.jetbrains.annotations.NotNull;

/**
 * Allows contracts to be defined by a consumer.
 * <p>
 * Each contract between a consumer and a provider will have one instance of a contract definer.
 */
public class ContractDefiner {

  private static final String TEST_RUN_ID = "JAVA";
  private final InternalDefinerClient definer;
  private final ContractCaseConfig config;


  /**
   * Constructs a ContractDefiner with the provided configuration. Configurations can be overridden
   * during the test runs (see
   * {@link #runInteraction(InteractionDefinition, IndividualSuccessTestConfig)} and
   * {@link #runThrowingInteraction(InteractionDefinition, IndividualFailedTestConfig)}).
   * <p>
   * This uses the default logPrinter implementation, which goes to standard out.
   *
   * @param config the configuration for this contract.
   */
  public ContractDefiner(final @NotNull ContractCaseConfig config) {
    this(config, new LogPrinterStandardOut());
  }

  /**
   * Constructs a ContractDefiner with the provided configuration. Configurations can be overridden
   * during the test runs (see
   * {@link #runInteraction(InteractionDefinition, IndividualSuccessTestConfig)} and
   * {@link #runThrowingInteraction(InteractionDefinition, IndividualFailedTestConfig)}).
   *
   * @param config the configuration for this contract.
   * @param logPrinter custom logging implementation if you want to report separately
   */
  public ContractDefiner(final @NotNull ContractCaseConfig config, LogPrinter logPrinter) {
    ContractCaseProcess.getInstance().start();

    this.config = config;

    InternalDefinerClient definer = null;
    try {
      definer = new InternalDefinerClient(
          ConnectorConfigMapper.map(config, TEST_RUN_ID),
          logPrinter,
          new BoundaryVersionGenerator().getVersions()
      );
    } catch (Exception e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
    this.definer = definer;
  }

  /**
   * Ends this contract definition and writes the contract. If the contract definition was not
   * successful (eg, a test failed), this will throw an appropriate ContractCase exception.
   *
   * @return A ContractWriteSuccess which describes the written contract
   */
  public ContractWriteSuccess endRecord() {
   return ConnectorResultMapper.mapSuccessWithAny(this.definer.endRecord(), ContractWriteSuccess.class);
  }

  /**
   * Loads one or more plugins.
   *
   * @param pluginNames The names of the plugins to load. Can be a path to the package, or the name
   *                    of a package that has previously been installed with npm.
   */
  public void loadPlugins(String... pluginNames) {
    try {
      ConnectorResultMapper.mapVoid(this.definer.loadPlugins(ConnectorConfigMapper.map(
          config,
          "DEFINER_LOAD_PLUGIN"
      ), pluginNames));
    } catch (Exception e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  /**
   * Runs an interaction test and adds it to the contract.
   *
   * @param definition       The definition of this interaction
   * @param additionalConfig Any additional configuration, will override configuration given in the
   *                         constructor.
   * @param <T>              Inferred return type from the trigger (ie, what your API call returns)
   * @param <I>              Inferred interaction type (ie, what kind of interaction this is)
   */
  public <T, I extends AnyInteractionDescriptor> void runInteraction(InteractionDefinition<I> definition,
      final @NotNull IndividualSuccessTestConfig<T> additionalConfig) {
    try {
      ConnectorResultMapper.mapVoid(definer.runInteraction(
          definition.toJSON(),
          ConnectorConfigMapper.mapSuccessExample(additionalConfig, TEST_RUN_ID)
      ));
    } catch (Exception e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  /**
   * Runs an interaction test and adds it to the contract. Convenience method so you don't have to
   * call {@code .build()} so often.
   *
   * @param definition       The definition of this interaction
   * @param additionalConfig Any additional configuration, but as a builder.
   * @param <T>              Inferred return type from the trigger (ie, what your API call returns)
   * @param <I>              Inferred interaction type (ie, what kind of interaction this is)
   */
  public <T, I extends AnyInteractionDescriptor> void runInteraction(InteractionDefinition<I> definition,
      final @NotNull IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder<T> additionalConfig) {
    this.runInteraction(definition, additionalConfig.build());
  }


  /**
   * Runs an interaction test and adds it to the contract without additional configuration. If you
   * need config for this interaction, use
   * {@link #runInteraction(InteractionDefinition, IndividualSuccessTestConfigBuilder)}
   *
   * @param definition The definition of this interaction
   * @param <I>        Inferred interaction type (ie, what kind of interaction this is)
   */
  public <I extends AnyInteractionDescriptor> void runInteraction(InteractionDefinition<I> definition) {
    this.runInteraction(
        definition,
        IndividualSuccessTestConfig
            .IndividualSuccessTestConfigBuilder
            .builder()
            .build()
    );
  }


  /**
   * Runs an interaction test where the trigger is expected to throw an error on success, and adds
   * it to the contract. If you need config for this interaction, use
   *
   * @param definition       The definition of this interaction
   * @param additionalConfig Any additional configuration
   * @param <T>              Inferred return type from the trigger (ie, what your API call returns)
   * @param <I>              Inferred interaction type (ie, what kind of interaction this is)
   */
  public <T, I extends AnyInteractionDescriptor> void runThrowingInteraction(InteractionDefinition<I> definition,
      IndividualFailedTestConfig<T> additionalConfig) {
    try {
      ConnectorResultMapper.mapVoid(definer.runRejectingInteraction(
          definition.toJSON(),
          ConnectorConfigMapper.mapFailingExample(additionalConfig, TEST_RUN_ID)
      ));
    } catch (Exception e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }

  /**
   * Runs an interaction test where the trigger is expected to throw an error on success, and adds
   * it to the contract if it successfully throws.
   *
   * @param definition       The definition of this interaction
   * @param additionalConfig Any additional configuration
   * @param <T>              Inferred return type from the trigger (ie, what your API call returns)
   * @param <I>              Inferred interaction type (ie, what kind of interaction this is)
   */
  public <T, I extends AnyInteractionDescriptor> void runThrowingInteraction(InteractionDefinition<I> definition,
      IndividualFailedTestConfigBuilder<T> additionalConfig) {
    this.runThrowingInteraction(definition, additionalConfig.build());
  }

  /**
   * Runs an interaction test where the trigger is expected to throw an error on success, and adds
   * it to the contract if it successfully throws. If you need additional configuration, use
   * {@link #runThrowingInteraction(InteractionDefinition, IndividualFailedTestConfigBuilder)}
   * instead.
   *
   * @param definition The definition of this interaction
   * @param <I>        Inferred interaction type (ie, what kind of interaction this is)
   */
  public <I extends AnyInteractionDescriptor> void runThrowingInteraction(InteractionDefinition<I> definition) {
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
    } catch (Exception e) {
      BoundaryCrashReporter.handleAndRethrow(e);
    }
  }
}
