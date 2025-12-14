package io.contract_testing.contractcase;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.contract_testing.contractcase.dsl.DslInteraction;
import io.contract_testing.contractcase.dsl.DslState;
import java.util.List;

/**
 * Describes an interaction, used during contract definition.
 *
 * @param <I> The type of the interaction
 */
public class InteractionDefinition<I extends DslInteraction> {

  private final List<? extends DslState> states;
  private final I definition;

  public InteractionDefinition(List<? extends DslState> states, I definition) {
    this.states = List.copyOf(states);
    this.definition = definition;
  }

  public List<? extends DslState> getStates() {
    return List.copyOf(states);
  }

  JsonNode toJSON() {
    var mapper = new ObjectMapper();
    ObjectNode node = mapper.createObjectNode();
    node.set("definition", mapper.valueToTree(definition));
    node.set(
        "states",
        mapper.createArrayNode()
            .addAll(this.states.stream()
                .<JsonNode>map(mapper::valueToTree)
                .toList())
    );

    return node;
  }


}
