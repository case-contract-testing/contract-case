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
 * Matches any Boolean
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class AnyBoolean implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * An example boolean to use during contract definition
   */
  @Getter
  @JsonProperty("_case:matcher:example")
  private final boolean example;

  @Getter
  @JsonProperty("_case:context:matchBy")
  @JsonInclude(Include.ALWAYS)
  public final String matchBy = "type";

  /**
   * Matches any Boolean
   * @param example An example boolean to use during contract definition
   */
  @Builder
  public AnyBoolean(@NotNull final boolean example) {
    this.type = "_case:MatchBoolean";
    this.example = example;
  }
}
