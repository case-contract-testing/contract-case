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
 * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.<pre>{@code   This version names this combination of arguments, which is useful for naming specific invocations.
 *
 *   This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
 *   are a plugin author.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class FunctionNamedArguments implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The unique name for this combination of arguments
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
   * An array of matchers that describe the expected function arguments in order.
   */
  @Getter
  @JsonProperty("arguments")
  private final List<Object> arguments;

  /**
   * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.<pre>{@code   This version names this combination of arguments, which is useful for naming specific invocations.
   *
   *   This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
   *   are a plugin author.
   * }</pre>
   * @param uniqueName The unique name for this combination of arguments
   * @param arguments An array of matchers that describe the expected function arguments in order.
   */
  @Builder
  public FunctionNamedArguments(
    @NotNull final String uniqueName,
    @NotNull final List<Object> arguments
  ) {
    this.type = "_case:FunctionArgumentsMatcher";
    this.uniqueName = uniqueName;
    this.arguments = arguments;
  }
}
