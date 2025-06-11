package io.contract_testing.contractcase.internal.client.rpc;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseCoreError;
import io.contract_testing.contractcase.internal.edge.ConnectorStateHandler;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import io.contract_testing.contractcase.internal.edge.ITriggerFunction;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class ConfigHandle {

  private final ContractCaseConnectorConfig baseConfig;
  private ContractCaseConnectorConfig configOverrides;

  public void setConnectorConfig(ContractCaseConnectorConfig boundaryConfig) {
    this.configOverrides = boundaryConfig;
  }

  public ConfigHandle(ContractCaseConnectorConfig configOverrides) {
    this.baseConfig = configOverrides;
    this.configOverrides = configOverrides;
  }

  ConnectorStateHandler getStateHandler(String stateName) {
    var override = getConnectorStateHandler(stateName, configOverrides);
    var base = getConnectorStateHandler(stateName, baseConfig);
    if (override != null) {
      return override;
    }
    if (base != null) {
      return base;
    }
    throw new ContractCaseCoreError("Core asked for state '" + stateName
        + "', but it didn't exist. This shouldn't happen, and indicates a config mapper is misbehaving somewhere");
  }

  @Nullable
  private static ConnectorStateHandler getConnectorStateHandler(String stateName,
      ContractCaseConnectorConfig source) {
    if (source.getConnectorStateHandlers() == null) {
      return null;
    }
    return source.getConnectorStateHandlers().get(stateName);
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
      return configOverrides.getTriggerAndTest();
    }

    var triggerMap = configOverrides.getTriggerAndTests();
    if (triggerMap == null) {
      throw new ContractCaseConfigurationError(
          "No trigger functions were provided, unable to run the trigger function '" + handle
              + "'", "INVALID_CONFIG");
    }
    return triggerMap.get(handle);
  }


}
