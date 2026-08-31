package io.contract_testing.contractcase.test.function;

/**
 * An exception with additional properties, used to test matching against the serialised content
 * (errorInternals) of a thrown exception. The errorInternals is serialised with Jackson, so public getters are
 * included in the errorInternals.
 */
public class ComplexException extends Exception {

  private final Integer code;
  private final String detail;

  public ComplexException(String message, Integer code, String detail) {
    super(message);
    this.code = code;
    this.detail = detail;
  }

  public Integer getCode() {
    return code;
  }

  public String getDetail() {
    return detail;
  }
}
