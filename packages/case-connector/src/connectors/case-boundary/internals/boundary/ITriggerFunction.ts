import { BoundaryResult } from './Result/index.js';

/**
 * Interface called by ContractCase to invoke user's test code.
 *
 * @public
 */
export interface ITriggerFunction {
  /**
   * Trigger the user's test code and test the response from it.
   *
   * @returns BoundarySuccess when successful; BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_TRIGGER_ERROR if the trigger fails;
   * BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR if the
   * verification function fails.
   */
  trigger(config: Record<string, unknown>): Promise<BoundaryResult>;
}
