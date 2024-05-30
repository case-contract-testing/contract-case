package io.contract_testing.contractcase.edge;

public class ConnectorSuccessWithAny extends ConnectorResult {

  private final Object payload;

  public ConnectorSuccessWithAny(Object payload) {

    this.payload = payload;
  }

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_ANY_PAYLOAD;
  }

  public Object getPayload() {
    return payload;
  }
}
