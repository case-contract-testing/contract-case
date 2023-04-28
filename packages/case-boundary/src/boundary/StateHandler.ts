import { CaseConfigurationError } from '@contract-case/case-core';
import { BoundaryResult } from './Result';

export abstract class BoundaryStateHandler {
  /**
   * @returns Either a `Failure` or a `SuccessWithMap`
   */
  setup(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler setup function not overridden`
    );
  }
}

export abstract class BoundaryStateHandlerWithTeardown extends BoundaryStateHandler {
  /**
   * @returns Either a `Failure` or a `Success`
   */
  teardown(): Promise<BoundaryResult> {
    throw new CaseConfigurationError(
      `${this}: State handler teardown function not overridden`
    );
  }
}
