import type { DataContext } from '../../entities/context/types';

const locationString = (
  matchContext: Pick<DataContext, '_case:currentRun:context:location'>,
) => ` (at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * The user-provided trigger failed when we weren't expecting it to
 */
export class CaseTriggerError extends Error {
  constructor(
    message: string,
    context?: Pick<DataContext, '_case:currentRun:context:location'>,
  ) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = CaseTriggerError.name;
  }
}
