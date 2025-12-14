package io.contract_testing.contractcase.dsl.matchers.primitives;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;

/**
 * Matches any null.<pre>{@code   How many is that? Well, one, probably.
 *
 *   Use this when you want to make a Trillion Dollar Mistake.
 * }</pre>
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class AnyNull implements DslMatcher {

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
  private final String resolvesTo = "null";

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "type";

  /**
   * Matches any null.<pre>{@code   How many is that? Well, one, probably.
   *
   *   Use this when you want to make a Trillion Dollar Mistake.
   * }</pre>
   */
  @Builder
  public AnyNull() {
    this.type = "_case:MatchNull";
  }
}
