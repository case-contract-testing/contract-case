package io.contract_testing.contractcase.edge;

import org.jetbrains.annotations.NotNull;

public interface RunTestCallback {

  @NotNull ConnectorResult runTest(@NotNull String testName,
      @NotNull InvokeCoreTest invoker);
}
