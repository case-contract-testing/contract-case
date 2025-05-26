package io.contract_testing.contractcase.configuration;

public interface TestResponseFunction<T> {

  /**
   * Called by the framework to test the response from your interaction's trigger function..
   * <p>
   * Implement this method with whatever assertions and tests you need to verify that you have
   * unmarshalled the expected object correctly.
   *
   * @param returnedObject The object returned from your trigger function.
   * @param config         the interaction setup, useful if you need state variables or other
   *                       context
   * @throws Exception Any exceptions thrown during your verification. Throwing an exception from
   *                   this method will fail the interaction.
   */
  void call(T returnedObject, InteractionSetup config) throws Exception;
}
