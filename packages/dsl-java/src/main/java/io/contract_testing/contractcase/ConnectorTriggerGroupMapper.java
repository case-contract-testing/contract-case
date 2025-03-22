package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.TriggerGroup;
import io.contract_testing.contractcase.configuration.TriggerGroups;
import io.contract_testing.contractcase.internal.BoundaryTriggerMapper;
import io.contract_testing.contractcase.internal.edge.ITriggerFunction;
import java.util.HashMap;
import java.util.Map;

class ConnectorTriggerGroupMapper {

  static Map<String, ? extends ITriggerFunction> map(TriggerGroups triggers) {
    var ret = new HashMap<String, ITriggerFunction>();

    triggers.getTriggerGroups().forEach((key, value) -> ret.putAll(groupToMap(value)));
    return ret;
  }


  private static <T> Map<String, ITriggerFunction> groupToMap(TriggerGroup<T> triggerGroup) {

    var trigger = triggerGroup.trigger();
    var ret = new HashMap<String, ITriggerFunction>();

    triggerGroup.testResponses().forEach((key, testResponseFunction) -> {
      ret.put(
          triggerGroup.name() + "::" + key,
          BoundaryTriggerMapper.map(trigger, testResponseFunction)
      );
    });

    triggerGroup.testErrorResponses().forEach((key, testErrorResponseFunction) -> {
      ret.put(
          triggerGroup.name() + "::" + key,
          BoundaryTriggerMapper.map(trigger, testErrorResponseFunction)
      );
    });

    return ret;
  }
}
