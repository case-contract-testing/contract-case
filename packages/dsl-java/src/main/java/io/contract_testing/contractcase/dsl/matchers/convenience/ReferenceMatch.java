package io.contract_testing.contractcase.dsl.matchers.convenience;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches a named matcher created with the NamedMatch matcher.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class ReferenceMatch implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name you gave to a previous call of NamedMatch
   */
  @Getter
  @JsonProperty("_case:matcher:uniqueName")
  private final String uniqueName;

  /**
   * Matches a named matcher created with the NamedMatch matcher.
   * @param uniqueName The name you gave to a previous call of NamedMatch
   */
  @Builder
  public ReferenceMatch(@NotNull final String uniqueName) {
    this.type = "_case:Lookup";
    this.uniqueName = uniqueName;
  }
}
