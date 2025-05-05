import type { LogLevelContext } from '../context/types';
import { errorLocationString } from './renderer';

/**
 * This is thrown by ContractCase core to indicate that the user-provided
 * trigger failed when we weren't expecting it to.
 *
 * @public
 */
export class CaseTriggerError extends Error {
  userFacingStackTrace: string;

  constructor(
    message: string,
    context?: LogLevelContext,
    userFacingStackTrace?: string,
  ) {
    super(`${message}${context ? errorLocationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseTriggerError';
    this.userFacingStackTrace = userFacingStackTrace ?? '';
  }
}
