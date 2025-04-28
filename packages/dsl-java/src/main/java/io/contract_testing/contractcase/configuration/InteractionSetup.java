package io.contract_testing.contractcase.configuration;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.internal.ConnectorResultMapper;
import io.contract_testing.contractcase.internal.edge.ConnectorSetupInfo;
import io.contract_testing.contractcase.internal.edge.InvokeCoreFunction;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.jetbrains.annotations.NotNull;

/**
 * Container for information about the mock side of a particular example
 */
public class InteractionSetup {

  private final Map<String, String> stateVariables;
  private final Map<String, String> mockSetup;
  private final Map<String, InvokeCoreFunction> functions;


  private InteractionSetup(ConnectorSetupInfo connectorSetupInfo) {
    this.stateVariables = connectorSetupInfo.stateVariables();
    this.mockSetup = connectorSetupInfo.mockSetup();
    this.functions = connectorSetupInfo.functions();
  }

  /**
   * Get a state variable set by a state definition or state handler
   *
   * @param key the state variable key that was defined in the state handler
   * @return The value of this state variable
   * @throws ContractCaseConfigurationError if there is no value for this key
   */
  public String getStateVariable(String key) {
    if (this.stateVariables.get(key) == null) {
      final var keys = new ArrayList<>(this.stateVariables.keySet());
      throw new ContractCaseConfigurationError(
          "Can't get state variable '" + key + "', as it's not present in the SetupInfo"
              + "'. Check the variable is defined in the contract. "
              + (keys.size() == 0
              ? "There are no currently defined state variables"
              : "Currently defined variables are: \n"
                  + keys
                  .stream().map(s -> "    " + s)
                  .collect(Collectors.joining("\n"))),
          "BAD_INTERACTION_DEFINITION"
      );
    }
    return this.stateVariables.get(key);
  }

  /**
   * Get a configuration parameter for the running mock example
   *
   * @param key the configuration key for this mock
   * @return The value of this configuration setting
   * @throws ContractCaseConfigurationError if there is no value for this key
   */
  public String getMockSetup(String key) {
    if (this.mockSetup.get(key) == null) {
      final var keys = new ArrayList<>(this.mockSetup.keySet());
      throw new ContractCaseConfigurationError(
          "Can't get mock setup value '" + key + "', as it's not present in the SetupInfo"
              + "'. Check the spelling of the setup value. "
              + (keys.size() == 0
              ? "There are no currently defined mock setup values"
              : "Currently defined setup values are: \n"
                  + keys
                  .stream().map(s -> "    " + s)
                  .collect(Collectors.joining("\n"))), "UNDOCUMENTED");
    }
    return this.mockSetup.get(key);
  }

  public Function<List<String>, String> getFunction(String name) {
    if (this.functions.get(name) == null) {
      final var keys = new ArrayList<>(this.functions.keySet());
      throw new ContractCaseConfigurationError(
          "Can't get function '" + name + "', as it's not present in the SetupInfo"
              + "'. Check the spelling of the function name. "
              + (keys.size() == 0
              ? "There are no currently defined functions"
              : "Currently defined functions are: \n"
                  + keys
                  .stream().map(s -> "    " + s)
                  .collect(Collectors.joining("\n"))), "UNDOCUMENTED");
    }
    return (args) -> ConnectorResultMapper.mapSuccessWithAny(
        this.functions.get(name).invoke(args)
    );
  }


  /**
   * Internal method: constructs a new InteractionSetup convenience object from this configuration
   * map. It's unlikely you'll need to call this.
   *
   * @param config The configuration map from the Connector
   * @return a new SetupInfo object
   */
  public static InteractionSetup from(@NotNull ConnectorSetupInfo config) {
    return new InteractionSetup(config);
  }

}
