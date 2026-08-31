package io.contract_testing.contractcase.test.function.verification;

public class CustomException extends Exception {

  public CustomException(String message) {
    super(message);
  }

  /**
   * Serialised into the error internals when this exception is thrown - the
   * caller contract expects a 4XX httpCode.
   *
   * @return the http status code for this error
   */
  public int getHttpCode() {
    return 404;
  }

  public CustomException() {

  }
}
