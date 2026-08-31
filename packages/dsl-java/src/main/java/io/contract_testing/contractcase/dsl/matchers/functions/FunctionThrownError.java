package io.contract_testing.contractcase.dsl.matchers.functions;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import javax.annotation.Nullable;
import lombok.Builder;
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

  /**
   * A matcher for the serialised content of the expected error, if any.
   * This feature exists in case you need to differentiate by some error code on the error type,
   * but in general it's not recommended to rely on the internals of your error data.
   * Instead, we recommend explicit error types for each kind of error that callers might care about,
   * and to match on the errorClassName instead. Matching on the error internals couples the contract
   * to the internal structure of the error, and should only be used as a last resort.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("errorInternals")
  private final Object errorInternals;

  /**
   * A unique name for this error response, if any. Useful for identifying this error response in verification trigger groups
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
     * Matches errors thrown from a function execution, for use with a MockFunctionCall / MockFunctionExecution.
     * @param errorClassName The class name for the expected error (must resolve to a string)
     * @param message The message for the expected error, if any
     * @param errorInternals A matcher for the serialised content of the expected error, if any. 
  This feature exists in case you need to differentiate by some error code on the error type, 
  but in general it's not recommended to rely on the internals of your error data. 
  Instead, we recommend explicit error types for each kind of error that callers might care about, 
  and to match on the errorClassName instead. Matching on the error internals couples the contract 
  to the internal structure of the error, and should only be used as a last resort.
     * @param uniqueName A unique name for this error response, if any. Useful for identifying this error response in verification trigger groups
     */
  @Builder
  public FunctionThrownError(
    @NotNull final Object errorClassName,
    @Nullable final Object message,
    @Nullable final Object errorInternals,
    @Nullable final String uniqueName
  ) {
    this.type = "_case:FunctionResultMatcher";
    this.errorClassName = errorClassName;
    this.message = message;
    this.errorInternals = errorInternals;
    this.uniqueName = uniqueName;
  }
}
