package io.contract_testing.contractcase;

import java.util.Map;

/**
 * Describes a setup function for use in a state handler where your state returns variables
 */
public interface SetupFunction {

  /**
   * Do state setup
   *
   * @return a map of state variables, keyed by the name.
   */
  Map<String, Object> setup();
}
