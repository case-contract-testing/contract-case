package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Convenience matcher to treat the string as a uri encoded string - useful in {@code path} segments.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class UriEncodedString<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The string to match
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final M unencodedString;

  @Builder
  public UriEncodedString(@NotNull final M unencodedString) {
    this.type = "_case:UrlEncodedString";
    this.unencodedString = unencodedString;
  }
}
