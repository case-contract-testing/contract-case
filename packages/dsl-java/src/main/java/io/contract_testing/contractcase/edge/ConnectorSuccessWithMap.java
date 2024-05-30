package io.contract_testing.contractcase.edge;

import java.util.Map;

public class ConnectorSuccessWithMap extends ConnectorResult {

  private final Map<String, Object> map;

  public ConnectorSuccessWithMap(Map<String, Object> map) {
    super();
    this.map = map;
  }

  @Override
  public String getResultType() {
    return ConnectorResultTypeConstants.RESULT_SUCCESS_HAS_MAP_PAYLOAD;
  }

  public Map<String, Object> getPayload() {
    return map;
  }
}
