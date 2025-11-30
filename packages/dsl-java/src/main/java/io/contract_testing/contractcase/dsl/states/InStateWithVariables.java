package io.contract_testing.contractcase.dsl.states;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslState;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * A state descriptor for configuring an example
 * that needs to run in a particular named state.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class InStateWithVariables<M> implements DslState {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:state:type")
  private final String type;

  /**
   * The name of the state used by this example.
   * This must match one of the state handlers provided in the configuration during the
   * example run.
   */
  @Getter
  @JsonProperty("stateName")
  private final String stateName;

  /**
   * A object where the keys are variable names, mapped to any data or matcher objects.
   */
  @Getter
  @JsonProperty("variables")
  private final M variables;

  @Builder
  public InStateWithVariables(
    @NotNull final String stateName,
    @NotNull final M variables
  ) {
    this.type = "_case:StateWithVariables";
    this.stateName = stateName;
    this.variables = variables;
  }
}
