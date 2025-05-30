package io.contract_testing.contractcase.internal.client.rpc;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.internal.edge.ConnectorStateHandler;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import io.contract_testing.contractcase.internal.edge.ITriggerFunction;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class ConfigHandle {

  public void setConnectorConfig(ContractCaseConnectorConfig boundaryConfig) {
    this.boundaryConfig = boundaryConfig;
  }

  private ContractCaseConnectorConfig boundaryConfig;

  public ConfigHandle(ContractCaseConnectorConfig boundaryConfig) {
    this.boundaryConfig = boundaryConfig;
  }

  ConnectorStateHandler getStateHandler(String stateName) {
    if (boundaryConfig.getConnectorStateHandlers() == null) {
      throw new ContractCaseConfigurationError(
          "No state handlers provided, you must provide a state handler that can run '" + stateName
              + "'", "INVALID_CONFIG");
    }
    var stateHandler = boundaryConfig.getConnectorStateHandlers().get(stateName);

    if (stateHandler == null) {
      throw new ContractCaseConfigurationError(
          "The state handler named '" + stateName
              + "' was not provided in the configuration", "INVALID_CONFIG");
    }
    return stateHandler;
  }

  @NotNull
  ITriggerFunction getTriggerFunction(String handle) {
    ITriggerFunction trigger = getTriggerInternal(handle);
    if (trigger == null) {
      throw new ContractCaseConfigurationError(
          "The trigger function named '" + handle
              + "' wasn't provided in the configuration, but is required by this test run",
          "INVALID_CONFIG"
      );
    }
    return trigger;
  }

  @Nullable
  private ITriggerFunction getTriggerInternal(String handle) {
    if (handle.equals(ConnectorOutgoingMapper.CONTRACT_CASE_TRIGGER_AND_TEST)) {
      return boundaryConfig.getTriggerAndTest();
    }

    var triggerMap = boundaryConfig.getTriggerAndTests();
    if (triggerMap == null) {
      throw new ContractCaseConfigurationError(
          "No trigger functions were provided, unable to run the trigger function '" + handle
              + "'", "INVALID_CONFIG");
    }
    return triggerMap.get(handle);
  }


}
