package io.contract_testing.contractcase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.contract_testing.contractcase.definitions.interactions.base.AnyInteractionDescriptor;
import io.contract_testing.contractcase.definitions.states.AnyState;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import java.util.List;

/**
 * Describes an interaction, used during contract definition.
 *
 * @param <I> The type of the interaction
 */
public class InteractionDefinition<I extends AnyInteractionDescriptor> {

  private final List<? extends AnyState> states;
  private final I definition;

  public InteractionDefinition(List<? extends AnyState> states, I definition) {
    this.states = List.copyOf(states);
    this.definition = definition;
  }

  public List<? extends AnyState> getStates() {
    return List.copyOf(states);
  }

  JsonNode toJSON() {
    var mapper = new ObjectMapper();
    ObjectNode node = mapper.createObjectNode();
    try {
      node.set("definition", mapper.valueToTree(mapper.readTree(definition.stringify())));
    } catch (JsonProcessingException e) {
      throw new ContractCaseCoreError(
          "Unable to convert definition to JSON - is the definition corrupt?",
          e);
    }
    node.set(
        "states",
        mapper.createArrayNode()
            .addAll(this.states.stream()
                .<JsonNode>map((state) -> {
                  try {
                    return mapper.valueToTree(mapper.readTree(state.stringify()));
                  } catch (JsonProcessingException e) {
                    throw new ContractCaseCoreError(
                        "Unable to convert state to JSON - is the interaction corrupt?",
                        e);
                  }
                })
                .toList())
    );

    return node;
  }


}
