import { CaseConfigurationError } from '@contract-case/case-core';
import { Result } from './Result';

export abstract class BoundaryStateHandler {
  /**
   * @returns Either a `Failure` or a `SuccessWithMap`
   */
  setup(): Promise<Result> {
    throw new CaseConfigurationError(
      `${this}: State handler setup function not overridden`
    );
  }
}

export abstract class BoundaryStateHandlerWithTeardown extends BoundaryStateHandler {
  /**
   * @returns Either a `Failure` or a `Success`
   */
  teardown(): Promise<Result> {
    throw new CaseConfigurationError(
      `${this}: State handler teardown function not overridden`
    );
  }
}
