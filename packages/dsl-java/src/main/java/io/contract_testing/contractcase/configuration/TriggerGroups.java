package io.contract_testing.contractcase.configuration;

import java.util.HashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;

public class TriggerGroups {

  private final Map<String, TriggerGroup<?>> triggerGroups = new HashMap<>();


  public <T> TriggerGroups addTriggerGroup(
      final @NotNull TriggerGroup<T> triggerGroup) {
    triggerGroups.put(triggerGroup.name(), triggerGroup);
    return this;
  }

  public Map<String, TriggerGroup<?>> getTriggerGroups() {
    return triggerGroups;
  }


}
