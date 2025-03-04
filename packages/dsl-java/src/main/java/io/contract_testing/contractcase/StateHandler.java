package io.contract_testing.contractcase;

import java.util.Map;

public class StateHandler {

  private final SetupFunction setupFn;
  private final TeardownFunction teardownFn;

  public static StateHandler setupFunction(SetupFunction setupFunction) {
    return new StateHandler(setupFunction, () -> {
    });
  }

  public static StateHandler setupFunction(SetupFunctionWithoutParameters setupFunction) {
    return new StateHandler(
        () -> {
          setupFunction.setup();
          return Map.of();
        },
        () -> {
        }
    );
  }

  public static StateHandler setupAndTeardown(SetupFunction setupFunction,
      TeardownFunction teardownFn) {
    return new StateHandler(setupFunction, teardownFn);
  }

  private StateHandler(SetupFunction setupFn, TeardownFunction teardownFn) {

    this.setupFn = setupFn;
    this.teardownFn = teardownFn;
  }

  public Map<String, Object> setup() {
    return this.setupFn.setup();
  }

  public void teardown() {
    this.teardownFn.teardown();
  }
}
