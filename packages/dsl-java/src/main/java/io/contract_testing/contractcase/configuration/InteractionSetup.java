package io.contract_testing.contractcase.configuration;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.exceptions.FunctionCompletedExceptionally;
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

  private static final ObjectMapper mapper = new ObjectMapper()
          .configure(JsonParser.Feature.INCLUDE_SOURCE_IN_LOCATION, true);

  private final Map<String, String> stateVariables;
  private final Map<String, String> mockSetup;
  private final Map<String, InvokeCoreFunction> functions;


  private InteractionSetup(ConnectorSetupInfo connectorSetupInfo) {
    this.stateVariables = connectorSetupInfo.stateVariables();
    this.mockSetup = connectorSetupInfo.mockSetup();
    this.functions = connectorSetupInfo.functions();
  }

  /**
   * Get a state variable set by a state definition or state handler. This method assumes that the variable is a string,
   * which is not always true. For this reason, this method is deprecated, and will be private in a future release.
   * Prefer using {@link #getStateVariable(String name, Class)}, {@link #getStringStateVariable(String name)}
   * or {@link #getIntegerStateVariable(String name)} instead
   *
   * @param key the state variable key that was defined in the state handler
   * @return The value of this state variable
   * @throws ContractCaseConfigurationError if there is no value for this key
   * @deprecated Prefer using
   */
  @Deprecated
  public String getStateVariable(String key) {
    return this.getStringStateVariable(key);
  }

  /**
   * Get a state variable set by a state definition or state handler. This returns the raw string, which is json.
   *
   * @param key the state variable key that was defined in the state handler
   * @return The value of this state variable
   * @throws ContractCaseConfigurationError if there is no value for this key
   */
  private String internalGetStateVariable(String key) {
    if (this.stateVariables.get(key) == null) {
      final var keys = new ArrayList<>(this.stateVariables.keySet());
      throw new ContractCaseConfigurationError(
              "Can't get state variable '" + key + "', as it's not present in the SetupInfo"
                      + "'. Check the variable is defined in the contract. "
                      + (keys.isEmpty()
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
   * Gets a state variable sets by a state definition or state handler. 
   *
   * @param name the name of the state variable
   * @param type The type of the value
   * @return the deserialised value
   * @param <T> The type of the deserialised object.
   * @throws ContractCaseConfigurationError if the value doesn't deserialise, or isn't found in the state variables.
   */
  public <T> T getStateVariable(String name, Class<T> type) {
    var json = this.internalGetStateVariable(name);
    try {
      return mapper.readValue(json, type);
    } catch(JsonProcessingException e ) {
       throw new ContractCaseConfigurationError(
          "Unable to deserialise Json parameter for '" + name + "'. Json was: " + json,
           e
       );
    }
  }

  /**
   * Convenience method to get an integer state variable set by a state definition or state handler
   * Equivalent to calling {@code getStateVariable(key, Integer.class)}
   *
   * @param key the state variable key that was defined in the state handler
   * @return The value of this state variable
   * @throws ContractCaseConfigurationError if there is no value for this key
   */
  public Integer getIntegerStateVariable(String key) {
    return this.getStateVariable(key, Integer.class);
  }


  /**
   * Convenience method to get a string state variable set by a state definition or state handler.
   * Equivalent to calling {@code getStateVariable(key, String.class)}
   *
   * @param key the state variable key that was defined in the state handler
   * @return The value of this state variable
   * @throws ContractCaseConfigurationError if there is no value for this key
   */
  public String getStringStateVariable(String key) {
      return this.getStateVariable(key, String.class);
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

  private record EitherReturnType(String success, String errorClassName, String message) {

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
    return (args) -> {

      var result = ConnectorResultMapper.mapSuccessWithAny(
          this.functions.get(name).invoke(args)
      );
      try {
        var parsedResult = ((EitherReturnType) mapper.readerFor(
            EitherReturnType.class).readValue(result));
        if (parsedResult.success() != null) {
          return parsedResult.success();
        }
        throw new FunctionCompletedExceptionally(
            parsedResult.errorClassName(),
            parsedResult.message() != null
                ? parsedResult.message()
                : null
        );
      } catch (JsonProcessingException e) {
        throw new ContractCaseCoreError("Unable to read function result:", e);
      }
    };
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
