package io.contract_testing.contractcase;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Container for information about the mock side of a particular example
 */
public class SetupInfo {

  public static final String STATE_VARIABLES_KEY = "variables";
  private final Map<String, Object> config;

  private final Map<String, String> stateVariables;

  private SetupInfo(Map<String, Object> config) {
    this.config = config;
    var variables = config.get(STATE_VARIABLES_KEY);
    if (variables == null) {
      this.stateVariables = Map.of();
    } else {
      try {
        this.stateVariables = Collections.unmodifiableMap((Map<String, String>) variables);
      } catch (ClassCastException e) {
        throw new ContractCaseCoreError("Invalid variables array in SetupInfo constructor", e);
      }
    }
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
      var stateKeys = new ArrayList<>(this.stateVariables.keySet());
      throw new ContractCaseConfigurationError("No state variable present with name '" + key
          + "'. Check the variable is defined in the contract. "
          + (stateKeys.size() == 0
          ? "There are no currently defined state variables"
          : "Currently defined variables are: \n"
              + stateKeys
              .stream().map(s -> "    " + s)
              .collect(Collectors.joining("\n"))));
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
  public String getInfo(String key) {
    if (this.config.get(key) == null) {
      throw new ContractCaseConfigurationError("No setup information for key '" + key
          + "'. Check the key is correct for this mock type");
    }

    try {
      return (String) this.config.get(key);
    } catch (ClassCastException e) {
      throw new ContractCaseCoreError(
          "The setup key '" + key + "' contained something that couldn't cast to a string",
          e
      );
    }
  }

  /**
   * Construct a new SetupInfo convenience object from this configuration map
   *
   * @param config The configuration map from the Connector
   * @return a new SetupInfo object
   */
  static SetupInfo from(Map<String, Object> config) {
    return new SetupInfo(config);
  }

}
