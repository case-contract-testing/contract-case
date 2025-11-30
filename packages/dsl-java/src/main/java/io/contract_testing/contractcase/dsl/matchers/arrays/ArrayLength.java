package io.contract_testing.contractcase.dsl.matchers.arrays;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.Integer;
import java.lang.String;
import javax.annotation.Generated;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;

/**
 * Matches an Array whose length is within the specified range (or 1-infinity if not specified).
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ArrayLength<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The minimum length for the array. Must be greater than zero,
   * otherwise empty arrays pass, which means you wouldn't be testing the array contents.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("_case:matcher:minLength")
  private final Integer minLength;

  /**
   * The maximum length for the array. Must be greater than minimum length
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("_case:matcher:maxLength")
  private final Integer maxLength;

  @Builder
  public ArrayLength() {
    this.type = "_case:ArrayLength";
    this.minLength = null;
    this.maxLength = null;
  }

  @Builder
  public ArrayLength(
    @Nullable final Integer minLength,
    @Nullable final Integer maxLength
  ) {
    this.type = "_case:ArrayLength";
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}
