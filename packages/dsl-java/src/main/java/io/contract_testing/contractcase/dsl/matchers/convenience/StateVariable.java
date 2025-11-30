package io.contract_testing.contractcase.dsl.matchers.convenience;

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
 * Matches the content of a variable that comes from a state. See <a href="https://case.contract-testing.io/docs/defining-contracts/state-definitions">state definitions</a> and <a href="https://case.contract-testing.io/docs/reference/state-handlers">state handlers</a> for more details.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class StateVariable<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The name of the variable
   */
  @Getter
  @JsonProperty("_case:matcher:variableName")
  private final String variableName;

  @Builder
  public StateVariable(@NotNull final String variableName) {
    this.type = "_case:ContextVariable";
    this.variableName = variableName;
  }
}
