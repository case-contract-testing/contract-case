package io.contract_testing.contractcase.definitions;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;


/**
 * Matches an Array which contains elements that match the given matchers. Note that two different
 * matchers may be satisfied by the same item in the array.
 *
 * @param <M> Any matcher or data
 */
public class ArrayContains<M> {

  @JsonProperty("_case:matcher:type")
  final String type;

  @JsonProperty("_case:matcher:matchers")
  final List<M> matchers;

  /**
   * Matches an Array which contains elements that match the given matchers. Note that two different
   * matchers may be satisfied by the same item in the array.
   *
   * @param matchers Any number of matchers, each of which must be found inside the array, in any
   *                 order.
   */
  public ArrayContains(List<M> matchers) {
    this.type = "_case:ArrayEachEntryLike";
    this.matchers = matchers;
  }
}
