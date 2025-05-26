package io.contract_testing.contractcase.configuration;

public interface TestErrorResponseFunction {

  /**
   * Called by the framework to test an exception that you expected to throw from your interaction.
   * <p>
   * Implement this method with whatever assertions and tests you need to verify that the exception
   * was the one you expected.
   *
   * @param e      The exception thrown by your trigger function.
   * @param config the interaction setup, useful if you need state variables or other context
   * @throws Exception Any exceptions thrown during your verification. Throwing an exception from
   *                   this method will fail the interaction.
   */
  void call(Exception e, InteractionSetup config) throws Exception;
}
