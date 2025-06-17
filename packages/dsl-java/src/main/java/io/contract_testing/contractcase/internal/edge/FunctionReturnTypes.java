package io.contract_testing.contractcase.internal.edge;

public class FunctionReturnTypes {

  /**
   * Represents the return from a successful function invocation
   * <p>
   * Most users will never need to use this type directly.
   *
   * @param success The returned data, as a json string
   */
  public record FunctionSuccess(String success) {

  }

  /***
   * Represents the exception from a function that has failed
   * <p>
   * Most users will never need to use this type directly.
   *
   * @param kind The class name of the exception it failed with
   * @param message The message, if any. May be null
   * @param stack The stack trace, never used for matching
   */
  public record FunctionFailure(String kind, String message, String stack) {

  }
}
