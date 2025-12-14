package io.contract_testing.contractcase.dsl.interactions.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslInteraction;
import io.contract_testing.contractcase.dsl.matchers.functions.FunctionArguments;
import io.contract_testing.contractcase.dsl.matchers.functions.FunctionReturnValue;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Defines an example that executes a registered function with specific arguments
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class WillCallFunction implements DslInteraction {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:mock:type")
  private final String type;

  /**
   * Internal boilerplate that determines behaviour during definition (write) and verification (read)
   */
  @Getter
  @JsonProperty("_case:run:context:setup")
  private final Object setup = Map.ofEntries(
    Map.entry(
      "write",
      Map.ofEntries(
        Map.entry("type", "_case:MockFunctionExecution"),
        Map.entry("stateVariables", "default"),
        Map.entry("triggers", "provided")
      )
    ),
    Map.entry(
      "read",
      Map.ofEntries(
        Map.entry("type", "_case:MockFunctionCaller"),
        Map.entry("stateVariables", "state"),
        Map.entry("triggers", "generated")
      )
    )
  );

  /**
   * The name of the function that will be called
   */
  @Getter
  @JsonProperty("functionName")
  private final String functionName;

  /**
   * The arguments expected by this function.
   */
  @Getter
  @JsonProperty("request")
  private final FunctionArguments arguments;

  /**
   * The return value of this function.
   */
  @Getter
  @JsonProperty("response")
  private final FunctionReturnValue returnValue;

  /**
   * Defines an example that executes a registered function with specific arguments
   * @param functionName The name of the function that will be called
   * @param arguments The arguments expected by this function. This should be an array containing the expectations for each parameter
   * @param returnValue The return value of this function.
   */
  @Builder
  public WillCallFunction(
    @NotNull final String functionName,
    @NotNull final List<Object> arguments,
    @NotNull final Object returnValue
  ) {
    this.type = "_case:MockFunctionExecution";
    this.functionName = functionName;
    this.arguments = new FunctionArguments(arguments);
    this.returnValue = new FunctionReturnValue(returnValue);
  }
}
