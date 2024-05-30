package io.contract_testing.contractcase.edge;

import org.jetbrains.annotations.NotNull;

public interface ConnectorStateHandler {

  @NotNull ConnectorResult setup();

  @NotNull ConnectorResult teardown();
}
