package io.contract_testing.contractcase.configuration;

/**
 * Describes a teardown function for use with state handlers
 */
public interface TeardownFunction {

  /**
   * Called when the framework wants to undo whatever was done in state setup
   */
  void teardown();
}
