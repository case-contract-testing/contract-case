package io.contract_testing.contractcase.edge;

import java.util.Map;


public record ConnectorSetupInfo(
    Map<String, String> stateVariables,
    Map<String, String> mockSetup,
    Map<String, InvokeCoreFunction> functions) {

}
