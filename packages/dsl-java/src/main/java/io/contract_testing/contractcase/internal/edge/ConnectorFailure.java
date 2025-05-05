package io.contract_testing.contractcase.internal.edge;

public class ConnectorFailure extends ConnectorResult {


  public String getKind() {
    return kind;
  }

  private final String kind;

  public String getMessage() {
    return message;
  }

  private final String message;

  public String getErrorCode() {
    return contractCaseErrorCode;
  }

  private final String contractCaseErrorCode;

  private final String userFacingStackTrace;

  public String getUserFacingStackTrace() {
    return userFacingStackTrace;
  }

  public String getLocation() {
    return location;
  }

  private final String location;

  public ConnectorFailure(String kind, String message, String location,
      String contractCaseErrorCode, String userFacingStackTrace) {
    this.kind = kind;
    this.message = message;
    this.location = location;
    this.contractCaseErrorCode = contractCaseErrorCode;
    this.userFacingStackTrace = userFacingStackTrace;
  }

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_FAILURE;
  }
}
