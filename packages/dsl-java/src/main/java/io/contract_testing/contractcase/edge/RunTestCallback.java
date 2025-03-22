package io.contract_testing.contractcase.edge;

import java.util.List;
import org.jetbrains.annotations.NotNull;

public interface RunTestCallback {

  @NotNull ConnectorResult runTest(@NotNull String testName,
      @NotNull InvokeCoreTest invoker);

  /**
   * Get all failures that happened in this run
   *
   * @return All failures that happened in this run
   */
  @NotNull List<ConnectorFailure> getFailures();
}
