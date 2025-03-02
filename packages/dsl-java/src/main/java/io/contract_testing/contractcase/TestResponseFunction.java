package io.contract_testing.contractcase;

public interface TestResponseFunction<T> {

  void call(T returnedObject, InteractionSetup config);
}
