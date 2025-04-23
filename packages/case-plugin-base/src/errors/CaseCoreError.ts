import type { LogLevelContext } from '../context/types';
import { errorLocationString } from './renderer';

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
  constructor(message: string, context?: LogLevelContext) {
    super(`${message}${context ? errorLocationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseCoreError';
  }
}
