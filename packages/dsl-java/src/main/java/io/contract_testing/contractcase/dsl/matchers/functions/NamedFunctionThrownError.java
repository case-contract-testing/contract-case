package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches errors thrown from a function execution, for use with a MockFunctionCall / MockFunctionExecution.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class NamedFunctionThrownError<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name of this error. Must be unique within this contract
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
   * The class name for the expected error
   */
  @Getter
  @JsonProperty("errorClassName")
  private final M errorClassName;

  /**
   * The message for the expected error, if any
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("message")
  private final M message;

  @Builder
  public NamedFunctionThrownError(
    @NotNull final String uniqueName,
    @NotNull final M errorClassName
  ) {
    this.type = "_case:FunctionResultMatcher";
    this.uniqueName = uniqueName;
    this.errorClassName = errorClassName;
    this.message = null;
  }

  @Builder
  public NamedFunctionThrownError(
    @NotNull final String uniqueName,
    @NotNull final M errorClassName,
    @Nullable final M message
  ) {
    this.type = "_case:FunctionResultMatcher";
    this.uniqueName = uniqueName;
    this.errorClassName = errorClassName;
    this.message = message;
  }
}
