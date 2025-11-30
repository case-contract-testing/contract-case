package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import java.util.List;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class FunctionArguments<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name of the function to match the arguments against.
   */
  @Getter
  @JsonProperty("functionName")
  private final String functionName;

  /**
   * An array of matchers that describe the expected function arguments in order.
   */
  @Getter
  @JsonProperty("arguments")
  private final List<M> arguments;

  @Builder
  public FunctionArguments(
    @NotNull final String functionName,
    @NotNull final List<M> arguments
  ) {
    this.type = "_case:FunctionArgumentsMatcher";
    this.functionName = functionName;
    this.arguments = arguments;
  }
}
