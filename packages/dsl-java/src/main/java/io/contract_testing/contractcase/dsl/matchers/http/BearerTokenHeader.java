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
 * Matches the value part of a OIDC or OAuth header with the supplied token.<pre>{@code   Useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class BearerTokenHeader implements DslMatcher {

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
  private final String prefix = "Bearer ";

  /**
   * Constant parameter resolvesTo
   */
  @Getter
  @JsonProperty("_case:matcher:resolvesTo")
  private final String resolvesTo = "string";

  /**
   * A string or string matcher for a Bearer auth token. Usually this will be a string or string matcher
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final Object value;

  /**
   * Matches the value part of a OIDC or OAuth header with the supplied token.<pre>{@code   Useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.
   * }</pre>
   * @param value A string or string matcher for a Bearer auth token. Usually this will be a string or string matcher
   */
  @Builder
  public BearerTokenHeader(@NotNull final Object value) {
    this.type = "_case:StringPrefix";
    this.value = value;
  }
}
