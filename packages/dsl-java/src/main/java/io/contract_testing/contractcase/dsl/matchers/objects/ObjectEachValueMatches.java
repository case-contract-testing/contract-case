package io.contract_testing.contractcase.dsl.matchers.objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an object where each value matches the provided matcher
 */
@Generated("@contract-case/case-definition-generator")
public class ObjectEachValueMatches<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The matcher that all values must pass
   */
  @Getter
  @JsonProperty("_case:matcher:matcher")
  private final M matcher;

  @Builder
  public ObjectEachValueMatches(@NotNull final M matcher) {
    this.type = "_case:ObjectValuesMatch";
    this.matcher = matcher;
  }
}
