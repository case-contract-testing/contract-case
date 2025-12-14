package io.contract_testing.contractcase.dsl.matchers.convenience;

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
 * Adds an example to the provided matcher. Useful when you have a complicated
 * set of constraints and ContractCase can't figure out what the best example should be.<p>The most common use case for this matcher is for providing a clear example for array matchers.<p>The provided example must be matchable by the child matcher.<p>Note that WithExample completely overrides the generated example that would normally be produced by the child matcher.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class WithExample implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The matcher to add an example to
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final Object child;

  /**
   * The example to use when stripping the matchers
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final Object example;

  /**
   * Adds an example to the provided matcher. Useful when you have a complicated
   * set of constraints and ContractCase can't figure out what the best example should be.<p>The most common use case for this matcher is for providing a clear example for array matchers.<p>The provided example must be matchable by the child matcher.<p>Note that WithExample completely overrides the generated example that would normally be produced by the child matcher.
   * @param child The matcher to add an example to
   * @param example The example to use when stripping the matchers
   */
  @Builder
  public WithExample(
    @NotNull final Object child,
    @NotNull final Object example
  ) {
    this.type = "_case:CascadingContext";
    this.child = child;
    this.example = example;
  }
}
