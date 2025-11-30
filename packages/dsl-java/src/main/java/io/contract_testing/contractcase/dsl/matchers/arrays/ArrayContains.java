package io.contract_testing.contractcase.dsl.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import java.util.List;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an Array which contains all the elements
 * that match the given matchers.
 * Note that two different matchers may be satisfied by the same item in the array.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ArrayContains<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * Any number of matchers,
   * each of which must be found inside the array, in any order.
   */
  @Getter
  @JsonProperty("_case:matcher:matchers")
  private final List<M> matchers;

  @Builder
  public ArrayContains(@NotNull final List<M> matchers) {
    this.type = "_case:ArrayContains";
    this.matchers = matchers;
  }
}
