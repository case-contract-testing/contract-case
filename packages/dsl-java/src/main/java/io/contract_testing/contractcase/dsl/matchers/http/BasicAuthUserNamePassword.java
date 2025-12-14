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
 * Matches the value part of a basic auth header.<pre>{@code   Use this as the parameter for a BasicAuthHeader matcher
 *
 *   This is useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class BasicAuthUserNamePassword implements DslMatcher {

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
   * The username to match
   */
  @Getter
  @JsonProperty("_case:matcher:username")
  private final Object username;

  /**
   * The password to match
   */
  @Getter
  @JsonProperty("_case:matcher:password")
  private final Object password;

  /**
   * Matches the value part of a basic auth header.<pre>{@code   Use this as the parameter for a BasicAuthHeader matcher
   *
   *   This is useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.
   * }</pre>
   * @param username The username to match
   * @param password The password to match
   */
  @Builder
  public BasicAuthUserNamePassword(
    @NotNull final Object username,
    @NotNull final Object password
  ) {
    this.type = "_case:HttpBasicAuth";
    this.username = username;
    this.password = password;
  }
}
