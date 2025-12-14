package io.contract_testing.contractcase.dsl.matchers.convenience;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches all of the provided matchers. Useful for combining restrictions
 * provided by different matchers, or creating new matchers without needing
 * plugins.<p>For best results, wrap the And matcher in a WithExample matcher.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class And implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * An array of the matchers to run against this particular spot in the tree
   */
  @Getter
  @JsonProperty("_case:matcher:children")
  private final List<Object> children;

  @Builder
  public And(@NotNull final List<Object> children) {
    this.type = "_case:And";
    this.children = children;
  }
}
