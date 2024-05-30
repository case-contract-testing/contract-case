package io.contract_testing.contractcase;

import io.contract_testing.contractcase.edge.ITriggerFunction;
import java.util.Map;

class ConnectorTriggerGroupMapper {

  static Map<String, ? extends ITriggerFunction> map(TriggerGroups triggers) {
    return triggers.toMap();
  }
}
