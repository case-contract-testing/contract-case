package io.contract_testing.contractcase.dsl.matchers.http;

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
 * Matches the value part of a basic auth header.<pre>{@code   Use this as the parameter for a BasicAuthHeader matcher
 *
 *   This is useful in conjunction with the StateVariable matcher, to mock out auth at contract definition time.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class BasicAuthUserNamePassword<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The username to match
   */
  @Getter
  @JsonProperty("_case:matcher:username")
  private final M username;

  /**
   * The password to match
   */
  @Getter
  @JsonProperty("_case:matcher:password")
  private final M password;

  @Builder
  public BasicAuthUserNamePassword(
    @NotNull final M username,
    @NotNull final M password
  ) {
    this.type = "_case:HttpBasicAuth";
    this.username = username;
    this.password = password;
  }
}
