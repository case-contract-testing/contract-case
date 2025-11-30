import { CaseConfigurationError } from '@contract-case/case-plugin-base';

/**
 * This is a type guard to help the compiler know that there's an unhandled case in the code, caused by a bad DSL declaration.
 *
 * It defers to a CaseConfigurationError with a type of BAD_DSL_DECLARATION, but allows the compiler to be able to detect an unreachable case.
 *
 */
export class UnreachableError extends CaseConfigurationError {
  constructor(message: string, check: never) {
    super(
      `${message} (bad value was: ${check})`,
      'DONT_ADD_LOCATION',
      'BAD_DSL_DECLARATION',
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'UnreachableError';
  }
}
