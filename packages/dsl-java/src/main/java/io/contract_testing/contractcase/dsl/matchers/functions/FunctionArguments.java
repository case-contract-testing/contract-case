package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.<pre>{@code   This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
 *   are a plugin author.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class FunctionArguments implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * An array of matchers that describe the expected function arguments in order.
   */
  @Getter
  @JsonProperty("arguments")
  private final List<Object> arguments;

  /**
   * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.<pre>{@code   This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
   *   are a plugin author.
   * }</pre>
   * @param arguments An array of matchers that describe the expected function arguments in order.
   */
  @Builder
  public FunctionArguments(@NotNull final List<Object> arguments) {
    this.type = "_case:FunctionArgumentsMatcher";
    this.arguments = arguments;
  }
}
