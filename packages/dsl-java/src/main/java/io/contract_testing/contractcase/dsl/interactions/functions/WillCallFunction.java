package io.contract_testing.contractcase.dsl.interactions.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslInteraction;
import java.lang.Object;
import java.lang.String;
import java.util.Map;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Defines an example that executes a registered function with specific arguments
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class WillCallFunction<M> implements DslInteraction {

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
   * The arguments expected by this function. Generally will be a FunctionArgumentsMatcher
   */
  @Getter
  @JsonProperty("request")
  private final M arguments;

  /**
   * The return value of this function. Generally will be a FunctionReturnValueMatcher
   */
  @Getter
  @JsonProperty("response")
  private final M returnValue;

  @Builder
  public WillCallFunction(
    @NotNull final M arguments,
    @NotNull final M returnValue
  ) {
    this.type = "_case:MockFunctionExecution";
    this.arguments = arguments;
    this.returnValue = returnValue;
  }
}
