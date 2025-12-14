package io.contract_testing.contractcase.dsl.matchers.modifiers;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Everything inside this matcher will be matched exactly, unless overridden
 * with a generic matcher (eg {@code AnyString} or{@code  ShapedLike}). Use this to switch
 * out of {@code shapedLike} and back to the default exact matching.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ExactlyLike implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The object, array, primitive or matcher to match exactly
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final Object child;

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "exact";

  /**
   * Everything inside this matcher will be matched exactly, unless overridden
   * with a generic matcher (eg {@code AnyString} or{@code  ShapedLike}). Use this to switch
   * out of {@code shapedLike} and back to the default exact matching.
   * @param child The object, array, primitive or matcher to match exactly
   */
  @Builder
  public ExactlyLike(@NotNull final Object child) {
    this.type = "_case:CascadingContext";
    this.child = child;
  }
}
