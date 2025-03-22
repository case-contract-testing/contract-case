package io.contract_testing.contractcase.configuration;

import io.contract_testing.contractcase.configuration.InteractionSetup;

public interface TestErrorResponseFunction {

  void call(Exception e, InteractionSetup config);
}
