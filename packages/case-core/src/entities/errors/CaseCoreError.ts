import type { DataContext } from '../../entities/context/types';

const locationString = (
  matchContext: Pick<DataContext, '_case:currentRun:context:location'>,
) => `(at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * Something went wrong in ContractCase internals. Almost certainly a bug.
 */
export class CaseCoreError extends Error {
  constructor(
    message: string,
    context?: Pick<DataContext, '_case:currentRun:context:location'>,
  ) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseCoreError.name;
  }
}
