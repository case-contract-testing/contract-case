package io.contract_testing.contractcase.exceptions;

public class FunctionCompletedExceptionally extends RuntimeException {


  private final String errorClassName;
  private final String exceptionMessage;
  private final Object errorInternals;

  public FunctionCompletedExceptionally(String errorClassName, String exceptionMessage) {
    this(errorClassName, exceptionMessage, null);
  }

  public FunctionCompletedExceptionally(String errorClassName, String exceptionMessage,
      Object errorInternals) {
    super(
        "Function completed exceptionally: "
            + errorClassName +
            (exceptionMessage != null
                ? " " + exceptionMessage
                : ""
            )
    );
    this.errorClassName = errorClassName;
    this.exceptionMessage = exceptionMessage;
    this.errorInternals = errorInternals;
  }

  public String getErrorClassName() {
    return errorClassName;
  }

  public String getExceptionMessage() {
    return exceptionMessage;
  }

  /**
   * The serialised content of the exception as described by the contract, if any. This is the
   * deserialised JSON content (typically a Map, List, or primitive), or null if the contract did
   * not describe a errorInternals for this error.
   *
   * @return the errorInternals, or null
   */
  public Object getErrorInternals() {
    return errorInternals;
  }

}
