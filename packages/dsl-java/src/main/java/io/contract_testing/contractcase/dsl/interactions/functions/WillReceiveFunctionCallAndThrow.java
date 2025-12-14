package io.contract_testing.contractcase.dsl.interactions.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslInteraction;
import io.contract_testing.contractcase.dsl.matchers.functions.FunctionArguments;
import io.contract_testing.contractcase.dsl.matchers.functions.FunctionThrownError;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import java.util.Map;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Defines an example that throws an error from a registered function with specific arguments
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class WillReceiveFunctionCallAndThrow implements DslInteraction {

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
        Map.entry("type", "_case:MockFunctionCaller"),
        Map.entry("stateVariables", "state"),
        Map.entry("triggers", "generated")
      )
    ),
    Map.entry(
      "read",
      Map.ofEntries(
        Map.entry("type", "_case:MockFunctionExecution"),
        Map.entry("stateVariables", "default"),
        Map.entry("triggers", "provided")
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
   * The error thrown by this function. Generally will be a FunctionReturnValueMatcher
   */
  @Getter
  @JsonProperty("response")
  private final FunctionThrownError error;

  @Builder
  public WillReceiveFunctionCallAndThrow(
    @NotNull final String functionName,
    @NotNull final List<Object> arguments,
    @NotNull final Object errorClassName,
    @Nullable final Object message
  ) {
    this.type = "_case:MockFunctionCaller";
    this.functionName = functionName;
    this.arguments = new FunctionArguments(arguments);
    this.error = new FunctionThrownError(errorClassName, message);
  }
}
