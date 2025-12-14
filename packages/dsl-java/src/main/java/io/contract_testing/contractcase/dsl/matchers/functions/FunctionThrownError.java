package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches errors thrown from a function execution, for use with a MockFunctionCall / MockFunctionExecution.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class FunctionThrownError implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The class name for the expected error (must resolve to a string)
   */
  @Getter
  @JsonProperty("errorClassName")
  private final Object errorClassName;

  /**
   * The message for the expected error, if any
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("message")
  private final Object message;

  @Builder
  public FunctionThrownError(
    @NotNull final Object errorClassName,
    @Nullable final Object message
  ) {
    this.type = "_case:FunctionResultMatcher";
    this.errorClassName = errorClassName;
    this.message = message;
  }
}
