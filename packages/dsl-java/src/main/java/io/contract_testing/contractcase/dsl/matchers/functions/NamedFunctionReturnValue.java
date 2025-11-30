package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches function return values, for use with a MockFunctionCall / MockFunctionExecution.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class NamedFunctionReturnValue<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name of this return value. Must be unique within this contract
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
   * The return value of this function
   */
  @Getter
  @JsonProperty("success")
  private final M returnValue;

  @Builder
  public NamedFunctionReturnValue(
    @NotNull final String uniqueName,
    @NotNull final M returnValue
  ) {
    this.type = "_case:FunctionResultMatcher";
    this.uniqueName = uniqueName;
    this.returnValue = returnValue;
  }
}
