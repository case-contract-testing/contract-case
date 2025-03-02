package io.contract_testing.contractcase;

import org.jetbrains.annotations.NotNull;


// example-extract _trigger-type
public interface Trigger<T> {

  /**
   * This function will be called by ContractCase to invoke your client code. You should return the
   * business object that your API client code returns.
   *
   * @param setup The configuration of your interaction (ie, state variables, properties of the
   *              running mock, etc.)
   * @return the returned business object from your client code, for verification by your
   * {@link TestResponseFunction}
   * @throws Throwable Any exception thrown by your code in the event of an error
   */
  T call(final @NotNull SetupInfo setup) throws Throwable;
}
// end-example
