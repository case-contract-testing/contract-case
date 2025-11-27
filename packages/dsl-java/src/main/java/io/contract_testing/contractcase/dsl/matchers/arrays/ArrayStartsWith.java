package io.contract_testing.contractcase.dsl.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import java.util.List;
import javax.annotation.Generated;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;

/**
 * Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.
 */
@Generated("@contract-case/case-definition-generator")
public class ArrayStartsWith<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * An array of matchers that describes the start of the array. Additional elements in the actual array are ignored.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("_case:matcher:children")
  private final List<M> children;

  @Builder
  public ArrayStartsWith() {
    this.type = "_case:ArrayShape";
    this.children = null;
  }

  @Builder
  public ArrayStartsWith(@Nullable final List<M> children) {
    this.type = "_case:ArrayShape";
    this.children = children;
  }
}
