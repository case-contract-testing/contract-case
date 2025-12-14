package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a string that ends with the given suffix.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StringSuffix implements DslMatcher {

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
   * The prefix to match. May itself be a matcher, and will be passed the string with the suffix stripped.
   */
  @Getter
  @JsonProperty("_case:matcher:prefix")
  private final Object prefix;

  /**
   * The suffix to match. Must be a string, and acceptable strings will match this suffix exactly.
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final String suffix;

  /**
   * Matches a string that ends with the given suffix.
   * @param prefix The prefix to match. May itself be a matcher, and will be passed the string with the suffix stripped.
   * @param suffix The suffix to match. Must be a string, and acceptable strings will match this suffix exactly.
   */
  @Builder
  public StringSuffix(
    @NotNull final Object prefix,
    @NotNull final String suffix
  ) {
    this.type = "_case:StringSuffix";
    this.prefix = prefix;
    this.suffix = suffix;
  }
}
