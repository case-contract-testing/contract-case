package io.contract_testing.contractcase;


/**
 * Describes a setup function for use in a state handler where your state doesn't need variables.
 */
public interface SetupFunctionWithoutVariables {

  /**
   * Do state setup.
   */
  void setup();
}
