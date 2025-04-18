package io.contract_testing.contractcase.configuration;

import io.contract_testing.contractcase.configuration.InteractionSetup;

public interface TestResponseFunction<T> {

  void call(T returnedObject, InteractionSetup config);
}
