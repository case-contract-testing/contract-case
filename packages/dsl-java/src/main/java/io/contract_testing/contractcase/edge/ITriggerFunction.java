package io.contract_testing.contractcase.edge;

import java.util.Map;
import org.jetbrains.annotations.NotNull;

public interface ITriggerFunction {

  /**
   * Trigger the user's test code and test the response from it.
   * <p>
   *
   * @param config This parameter is required.
   * @return BoundarySuccess when successful; BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_TRIGGER_ERROR if the trigger fails; BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR if the verification function fails.
   */

  ConnectorResult trigger(final @NotNull Map<String, Object> config);

}
