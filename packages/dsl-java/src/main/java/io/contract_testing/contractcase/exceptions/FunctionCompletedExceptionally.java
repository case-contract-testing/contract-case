package io.contract_testing.contractcase.exceptions;

public class FunctionCompletedExceptionally extends RuntimeException {


  private final String errorClassName;
  private final String exceptionMessage;

  public FunctionCompletedExceptionally(String errorClassName, String exceptionMessage) {
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
  }

  public String getErrorClassName() {
    return errorClassName;
  }

  public String getExceptionMessage() {
    return exceptionMessage;
  }

}
