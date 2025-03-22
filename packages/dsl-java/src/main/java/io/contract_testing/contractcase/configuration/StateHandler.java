package io.contract_testing.contractcase.configuration;

import java.util.Map;

/**
 * User-provided state setup and teardown functions.
 */
public class StateHandler {

  private final SetupFunction setupFn;
  private final TeardownFunction teardownFn;

  /**
   * Creates a state handler that has only a setup function which returns variables.
   *
   * @param setupFunction The setup function
   * @return A state handler for use in configuration
   */
  public static StateHandler setupFunction(SetupFunction setupFunction) {
    return new StateHandler(setupFunction, () -> {
    });
  }

  /**
   * Creates a state handler that has only a setup function and returns no variables.
   *
   * @param setupFunction The setup function with no variables
   * @return A new state handler
   */
  public static StateHandler setupFunction(SetupFunctionWithoutVariables setupFunction) {
    return new StateHandler(
        () -> {
          setupFunction.setup();
          // We use null to tell the core that there were no variables returned
          return null;
        },
        () -> {
        }
    );
  }

  /**
   * Creates a state handler that has both a setup function which returns variables, and a teardown
   * function.
   *
   * @param setupFunction    The setup function
   * @param teardownFunction the teardown function
   * @return The state handler
   */
  public static StateHandler setupAndTeardown(SetupFunction setupFunction,
      TeardownFunction teardownFunction) {
    return new StateHandler(setupFunction, teardownFunction);
  }

  /**
   * Creates a state handler that has both a setup function with no variables returned, and a
   * teardown function.
   *
   * @param setupFunction    The setup function
   * @param teardownFunction the teardown function
   * @return The state handler
   */
  public static StateHandler setupAndTeardown(SetupFunctionWithoutVariables setupFunction,
      TeardownFunction teardownFunction) {
    return new StateHandler(() -> {
      setupFunction.setup();
      // We use null to tell the core that there were no variables returned
      return null;
    }, teardownFunction);
  }

  private StateHandler(SetupFunction setupFn, TeardownFunction teardownFn) {
    this.setupFn = setupFn;
    this.teardownFn = teardownFn;
  }

  /**
   * Calls the setup function of this state handler. This is called by the framework, you don't need
   * to call it yourself.
   *
   * @return A map of state variables from the setup.
   */
  public Map<String, Object> setup() {
    return this.setupFn.setup();
  }

  /**
   * Calls the teardown function of this state handler. This is called by the framework, you don't
   * need to call it yourself.
   */
  public void teardown() {
    this.teardownFn.teardown();
  }
}
