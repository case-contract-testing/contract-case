package io.contract_testing.contractcase.dsl.matchers.http;

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
 * Convenience matcher to treat the string as a uri encoded string - useful in {@code path} segments.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class UriEncodedString implements DslMatcher {

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
   * The string to match
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final Object unencodedString;

  /**
   * Convenience matcher to treat the string as a uri encoded string - useful in {@code path} segments.
   * @param unencodedString The string to match
   */
  @Builder
  public UriEncodedString(@NotNull final Object unencodedString) {
    this.type = "_case:UrlEncodedString";
    this.unencodedString = unencodedString;
  }
}
