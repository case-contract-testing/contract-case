package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches function return values, for use with a MockFunctionCall / MockFunctionExecution.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class FunctionReturnValue implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The return value of this function
   */
  @Getter
  @JsonProperty("success")
  private final Object returnValue;

  @Builder
  public FunctionReturnValue(@NotNull final Object returnValue) {
    this.type = "_case:FunctionResultMatcher";
    this.returnValue = returnValue;
  }
}
