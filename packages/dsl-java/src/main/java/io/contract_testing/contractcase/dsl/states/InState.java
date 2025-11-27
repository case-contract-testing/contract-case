package io.contract_testing.contractcase.dsl.states;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.lang.String;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * A state descriptor for configuring an example
 * that needs to run in a particular named state.
 */
@Generated("@contract-case/case-definition-generator")
public class InState<M> {

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

  @Builder
  public InState(@NotNull final String stateName) {
    this.type = "_case:NamedState";
    this.stateName = stateName;
  }
}
