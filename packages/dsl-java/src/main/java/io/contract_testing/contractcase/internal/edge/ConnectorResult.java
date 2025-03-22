package io.contract_testing.contractcase.internal.edge;

import org.jetbrains.annotations.NotNull;

public abstract class ConnectorResult {


  public static ConnectorResult toConnectorResult(ConnectorResult result) {
    return result;
  }

  public static ConnectorResult fromConnectorResult(@NotNull ConnectorResult result) {
    return result;
  }

  public abstract String getResultType();

}
