import { CaseConfigurationError } from '@contract-case/case-core';
import { BoundaryResult } from './Result';

export abstract class BoundaryStateHandler {
  /**
   * Call the user's state setup function
   *
   * @returns Either a `BouundaryFailure` with
   * `kind=BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` or a
   * `BoundarySuccess` when there's no variables returned, or a
   * `BoundarySuccessWithMap` when there are variables returned
   */
  setup(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler setup function not overridden`
    );
  }
}

export abstract class BoundaryStateHandlerWithTeardown extends BoundaryStateHandler {
  /**
   * Call the user's state teardown function
   *
   * @returns Either a `BouundaryFailure` with `kind=BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR` or a `BoundarySuccess`
   */
  teardown(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler teardown function not overridden`
    );
  }
}
