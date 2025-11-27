package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a string that starts with the given prefix.
 */
@Generated("@contract-case/case-definition-generator")
public class StringPrefix<M> {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The prefix to match. Must be a string.
   */
  @Getter
  @JsonProperty("_case:matcher:prefix")
  private final String prefix;

  /**
   * The string suffix.<pre>{@code       May itself be a matcher, and will be passed the string with the prefix stripped.
   *
   *         If you don't mind what the suffix is, pass an `AnyString` matcher
   * }</pre>
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final M suffix;

  /**
   * An example string to use during contract definition
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final String example;

  @Builder
  public StringPrefix(
    @NotNull final String prefix,
    @NotNull final M suffix,
    @NotNull final String example
  ) {
    this.type = "_case:MatchStringPrefix";
    this.prefix = prefix;
    this.suffix = suffix;
    this.example = example;
  }
}
