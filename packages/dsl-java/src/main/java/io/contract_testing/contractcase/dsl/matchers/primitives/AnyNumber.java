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
import org.jetbrains.annotations.NotNull;

/**
 * Matches any number
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class AnyNumber implements DslMatcher {

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
  private final String resolvesTo = "number";

  /**
   * An example number
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final double example;

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "type";

  /**
   * Matches any number
   * @param example An example number
   */
  @Builder
  public AnyNumber(@NotNull final double example) {
    this.type = "_case:MatchNumber";
    this.example = example;
  }
}
