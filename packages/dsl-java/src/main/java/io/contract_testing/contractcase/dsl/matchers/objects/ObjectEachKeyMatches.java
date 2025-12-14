package io.contract_testing.contractcase.dsl.matchers.objects;

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
 * Matches an object where each key matches the provided matcher
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ObjectEachKeyMatches implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The matcher that all keys must pass
   */
  @Getter
  @JsonProperty("_case:matcher:matcher")
  private final Object matcher;

  /**
   * Matches an object where each key matches the provided matcher
   * @param matcher The matcher that all keys must pass
   */
  @Builder
  public ObjectEachKeyMatches(@NotNull final Object matcher) {
    this.type = "_case:ObjectKeysMatch";
    this.matcher = matcher;
  }
}
