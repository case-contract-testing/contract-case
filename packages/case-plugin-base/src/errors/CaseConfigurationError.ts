import type { DataContext } from '../context/types';

const locationString = (
  matchContext: Pick<DataContext, '_case:currentRun:context:location'>,
) => ` (at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * Indicates that the user has configured ContractCase incorrectly.
 *
 * Throw this during mock setup if you encounter configuration errors.
 *
 * @public
 */
export class CaseConfigurationError extends Error {
  constructor(
    message: string,
    context?: Pick<DataContext, '_case:currentRun:context:location'>,
  ) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseConfigurationError.name;
  }
}
