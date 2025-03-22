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

  public String getLocation() {
    return location;
  }

  private final String location;

  public ConnectorFailure(String kind, String message, String location) {
    this.kind = kind;
    this.message = message;
    this.location = location;
  }

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_FAILURE;
  }
}
