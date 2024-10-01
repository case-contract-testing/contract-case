import type { DataContext } from '../context/types';

const locationString = (
  matchContext: Pick<DataContext, '_case:currentRun:context:location'>,
) => ` (at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * This is thrown by ContractCase core to indicate that the user-provided
 * trigger failed when we weren't expecting it to.
 *
 * @public
 */
export class CaseTriggerError extends Error {
  constructor(
    message: string,
    context?: Pick<DataContext, '_case:currentRun:context:location'>,
  ) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseTriggerError';
  }
}
