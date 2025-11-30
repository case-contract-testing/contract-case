package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a string that ends with the given suffix.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StringSuffix<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The prefix to match. May itself be a matcher, and will be passed the string with the suffix stripped.
   */
  @Getter
  @JsonProperty("_case:matcher:prefix")
  private final M prefix;

  /**
   * The suffix to match. Must be a string, and acceptable strings will match this suffix exactly.
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final String suffix;

  @Builder
  public StringSuffix(@NotNull final M prefix, @NotNull final String suffix) {
    this.type = "_case:MatchStringSuffix";
    this.prefix = prefix;
    this.suffix = suffix;
  }
}
