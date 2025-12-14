package io.contract_testing.contractcase.dsl.matchers.strings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a JSON.stringify()ed version of the given object.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StringifiedJson implements DslMatcher {

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
   * The object to stringify. May also contain matchers
   */
  @Getter
  @JsonProperty("_case:matcher:object")
  private final Object object;

  @Builder
  public StringifiedJson(@NotNull final Object object) {
    this.type = "_case:JsonEncoded";
    this.object = object;
  }
}
