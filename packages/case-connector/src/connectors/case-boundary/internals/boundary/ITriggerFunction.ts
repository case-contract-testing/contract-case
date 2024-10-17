import { BoundaryResult } from './Result/index.js';

export type BoundaryCoreFunction = (
  ...args: string[]
) => Promise<BoundaryResult>;

export type BoundarySetupInfo = {
  stateVariables: Record<string, string>;
  /**
   * Functions defined or registered in the core,
   * that can be called by host wrappers.
   * These functions are never-fail - they always return a successful promise.
   */
  functions: Record<string, BoundaryCoreFunction>;
  mock: Record<string, string>;
};

/**
 * Interface called by ContractCase to invoke user's test code.
 *
 * @public
 */
export interface ITriggerFunction {
  /**
   * Trigger the user's test code and test the response from it.
   *
   * @param setup - The information about the setup for this test
   *
   * @returns BoundarySuccess when successful; BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_TRIGGER_ERROR if the trigger fails;
   * BoundaryFailure with
   * kind=BoundaryFailureKindConstants.CASE_VERIFY_RETURN_ERROR if the
   * verification function fails.
   */
  trigger(setup: BoundarySetupInfo): Promise<BoundaryResult>;
}
