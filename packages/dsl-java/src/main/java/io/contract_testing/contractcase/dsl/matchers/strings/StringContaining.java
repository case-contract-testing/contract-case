package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a string that contains the given substring.
 */
@Generated("@contract-case/case-definition-generator")
public class StringContaining<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The substring that acceptable strings must contain
   */
  @Getter
  @JsonProperty("_case:matcher:contains")
  private final String substring;

  /**
   * An example string to use during contract definition
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final String example;

  @Builder
  public StringContaining(
    @NotNull final String substring,
    @NotNull final String example
  ) {
    this.type = "_case:StringContains";
    this.substring = substring;
    this.example = example;
  }
}
