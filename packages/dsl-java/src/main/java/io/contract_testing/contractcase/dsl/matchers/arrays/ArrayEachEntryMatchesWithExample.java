package io.contract_testing.contractcase.dsl.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an array where each element matches the provided matcher. This is like ArrayEachEntryMatches, but you can override the example.
 */
@Generated("@contract-case/case-definition-generator")
public class ArrayEachEntryMatchesWithExample<M> {

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

  /**
   * Example data to use instead of the generated one
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final List<Object> example;

  @Builder
  public ArrayEachEntryMatchesWithExample(
    @NotNull final M matcher,
    @NotNull final List<Object> example
  ) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
    this.example = example;
  }
}
