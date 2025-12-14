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
 * Matches a string that starts with the given prefix.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StringPrefix implements DslMatcher {

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
   * The prefix to match. Must be a string.
   */
  @Getter
  @JsonProperty("_case:matcher:prefix")
  private final String prefix;

  /**
   * The string suffix.<p>May itself be a matcher, and will be passed the string with the prefix stripped.<p>If you don't mind what the suffix is, pass an {@code AnyString} matcher
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final Object suffix;

  /**
     * Matches a string that starts with the given prefix.
     * @param prefix The prefix to match. Must be a string.
     * @param suffix The string suffix. 
          
May itself be a matcher, and will be passed the string with the prefix stripped.
            
If you don't mind what the suffix is, pass an `AnyString` matcher
     */
  @Builder
  public StringPrefix(
    @NotNull final String prefix,
    @NotNull final Object suffix
  ) {
    this.type = "_case:StringPrefix";
    this.prefix = prefix;
    this.suffix = suffix;
  }
}
