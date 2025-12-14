package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a string that contains the given substring.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StringContaining implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * Constant parameter resolvesTo
   */
  @Getter
  @JsonProperty("_case:matcher:resolvesTo")
  private final String resolvesTo = "string";

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

  /**
   * Matches a string that contains the given substring.
   * @param substring The substring that acceptable strings must contain
   * @param example An example string to use during contract definition
   */
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
