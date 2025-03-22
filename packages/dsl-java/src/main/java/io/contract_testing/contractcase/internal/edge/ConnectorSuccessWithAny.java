package io.contract_testing.contractcase.internal.edge;

public class ConnectorSuccessWithAny extends ConnectorResult {

  private final String payload;

  public ConnectorSuccessWithAny(String payload) {

    this.payload = payload;
  }

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD;
  }

  public String getPayload() {
    return payload;
  }
}
