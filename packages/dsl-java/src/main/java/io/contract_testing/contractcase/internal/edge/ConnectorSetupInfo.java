package io.contract_testing.contractcase.internal.edge;

import java.util.Map;


public record ConnectorSetupInfo(
    Map<String, String> stateVariables,
    Map<String, String> mockSetup,
    Map<String, InvokeCoreFunction> functions) {

  public ConnectorSetupInfo {
    stateVariables = Map.copyOf(stateVariables);
    mockSetup = Map.copyOf(mockSetup);
    functions = Map.copyOf(functions);
  }
}
