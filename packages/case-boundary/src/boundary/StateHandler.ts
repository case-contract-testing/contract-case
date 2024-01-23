import { CaseConfigurationError } from '@contract-case/case-core';
import { BoundaryResult } from './Result';

/**
 * An interface for a state handler that only has setup
 *
 * @public
 */
export abstract class BoundaryStateHandler {
  /**
   * Call the user's state setup function.
   *
   * If the user provided no setup function, this should be a function that does nothing and returns a `BoundarySuccess`
   *
   * @returns Either a `BoundaryFailure` with
   * `kind=BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` or a
   * `BoundarySuccess` when there's no variables returned, or a
   * `BoundarySuccessWithMap` when there are variables returned
   */
  setup(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler setup function not overridden`,
    );
  }

  /**
   * Call the user's state teardown function
   *
   * If the user provided no teardown function, this should be a function that does nothing and returns a `BoundarySuccess`
   *
   * @returns Either a `BoundaryFailure` with `kind=BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` or a `BoundarySuccess`
   */
  teardown(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler teardown function not overridden`,
    );
  }
}
