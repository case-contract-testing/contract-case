package io.contract_testing.contractcase.exceptions;

public class FunctionCompletedExceptionally extends RuntimeException {


  private final String errorClassName;
  private final String exceptionMessage;
  private final Object payload;

  public FunctionCompletedExceptionally(String errorClassName, String exceptionMessage) {
    this(errorClassName, exceptionMessage, null);
  }

  public FunctionCompletedExceptionally(String errorClassName, String exceptionMessage,
      Object payload) {
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
    this.payload = payload;
  }

  public String getErrorClassName() {
    return errorClassName;
  }

  public String getExceptionMessage() {
    return exceptionMessage;
  }

  /**
   * The serialised content of the exception as described by the contract, if any. This is the
   * deserialised JSON payload (typically a Map, List, or primitive), or null if the contract did
   * not describe a payload for this error.
   *
   * @return the payload, or null
   */
  public Object getPayload() {
    return payload;
  }

}
