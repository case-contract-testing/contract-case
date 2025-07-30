package io.contract_testing.contractcase.internal.edge;

import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.VerificationTestHandle;
import java.util.List;
import org.jetbrains.annotations.NotNull;

/**
 * @deprecated This interface is no longer called. Instead, use
 * {@link
 * ContractVerifier#prepareVerification()}
 */
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
