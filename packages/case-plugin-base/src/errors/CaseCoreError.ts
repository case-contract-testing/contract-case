import type { DataContext } from '../context/types';

const locationString = (
  matchContext: Pick<DataContext, '_case:currentRun:context:location'>,
) => `(at ${matchContext['_case:currentRun:context:location'].join('.')})`;

/**
 * Something went wrong in ContractCase internals.
 *
 * @remarks
 * Use this when there is almost certainly a bug in the implementation of the contract case core or your plugin.
 *
 * If used during a plugin execution, please include the plugin name / bug reporting instructions in the message.
 * @public
 */
export class CaseCoreError extends Error {
  constructor(
    message: string,
    context?: Pick<DataContext, '_case:currentRun:context:location'>,
  ) {
    super(`${message}${context ? locationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseCoreError';
  }
}
