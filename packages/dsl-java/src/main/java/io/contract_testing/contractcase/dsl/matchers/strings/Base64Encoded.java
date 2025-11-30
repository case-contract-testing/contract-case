package io.contract_testing.contractcase.dsl.matchers.strings;

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
 * Matches a base64 encoded version of the given string or string matcher.<pre>{@code   WARNING: Since many strings are accidentally decodable as base64, this matcher is
 *     best combined with a more restrictive string matcher (eg `StringifiedJson`).
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class Base64Encoded<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The string or string matcher to encode.
   */
  @Getter
  @JsonProperty("_case:matcher:child")
  private final M child;

  @Builder
  public Base64Encoded(@NotNull final M child) {
    this.type = "_case:Base64Encoded";
    this.child = child;
  }
}
