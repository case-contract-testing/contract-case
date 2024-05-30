package io.contract_testing.contractcase.edge;

public class ConnectorSuccess extends ConnectorResult {

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_SUCCESS;
  }
}
