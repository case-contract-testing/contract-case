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
 * Matches the value part of a basic auth header.<pre>{@code   Typically you'll want to pass a BasicAuthUserNamePassword matcher to this.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class BasicAuthHeader implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * Constant parameter prefix
   */
  @Getter
  @JsonProperty("_case:matcher:prefix")
  private final String prefix = "Basic ";

  /**
   * Constant parameter resolvesTo
   */
  @Getter
  @JsonProperty("_case:matcher:resolvesTo")
  private final String resolvesTo = "string";

  /**
   * The value part of the basic auth header. Usually this will be a BasicAuthUserNamePassword
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final Object value;

  /**
   * Matches the value part of a basic auth header.<pre>{@code   Typically you'll want to pass a BasicAuthUserNamePassword matcher to this.
   * }</pre>
   * @param value The value part of the basic auth header. Usually this will be a BasicAuthUserNamePassword
   */
  @Builder
  public BasicAuthHeader(@NotNull final Object value) {
    this.type = "_case:StringPrefix";
    this.value = value;
  }
}
