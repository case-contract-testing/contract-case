package io.contract_testing.contractcase.dsl.matchers.modifiers;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
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

/**
 * Everything inside this matcher will be matched exactly, unless overridden
 * with a generic matcher (eg {@code AnyString} or{@code  ShapedLike}). Use this to switch
 * out of {@code shapedLike} and back to the default exact matching.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ExactlyLike<M> implements DslMatcher {

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
  private final M child;

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "exact";

  @Builder
  public ExactlyLike(@NotNull final M child) {
    this.type = "_case:CascadingContext";
    this.child = child;
  }
}
