package io.contract_testing.contractcase.dsl.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an array where each element matches the provided matcher.
 */
@Generated("@contract-case/case-definition-generator")
public class ArrayEachEntryMatches<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The matcher to match against each element of the array.
   */
  @Getter
  @JsonProperty("_case:matcher:matcher")
  private final M matcher;

  @Builder
  public ArrayEachEntryMatches(@NotNull final M matcher) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
  }
}
