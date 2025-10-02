package io.contract_testing.contractcase.definitions.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param <M> Any matcher or data
 */
public class ArrayEachEntryMatches<M> {

  @JsonProperty("_case:matcher:type")
  final String type;

  @JsonProperty("_case:matcher:matcher")
  final M matcher;

  @JsonInclude(Include.NON_NULL)
  @JsonProperty("_case:matcher:example")
  final List<Object> example;

  /**
   * Matches an array where each element matches the provided matcher.
   *
   * @param matcher The matcher to match against each element of the array.
   */
  public ArrayEachEntryMatches(M matcher) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
    this.example = null;
  }

  /**
   * Matches an array where each element matches the provided matcher.
   *
   * @param matcher The matcher to match against each element of the array.
   * @param example Example data to use instead of the generated one
   */
  public ArrayEachEntryMatches(M matcher, List<Object> example) {
    this.type = "_case:ArrayEachEntryLike";
    this.matcher = matcher;
    this.example = example;
  }

}