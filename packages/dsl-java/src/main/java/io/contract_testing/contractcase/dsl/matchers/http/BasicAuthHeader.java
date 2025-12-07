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
 * Matches the value part of a basic auth header.<pre>{@code   Typically you'll want to pass a BasicAuthUserNamePassword matcher to this.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class BasicAuthHeader<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The value part of the basic auth header. Usually this will be a BasicAuthUserNamePassword
   */
  @Getter
  @JsonProperty("_case:matcher:suffix")
  private final M value;

  @Builder
  public BasicAuthHeader(@NotNull final M value) {
    this.type = "_case:StringPrefix";
    this.value = value;
  }
}
