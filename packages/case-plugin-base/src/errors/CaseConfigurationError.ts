import type { LogLevelContext } from '../context/types';
import { errorLocationString } from './renderer';

/**
 * Indicates that the user has configured ContractCase incorrectly.
 *
 * Throw this during mock setup if you encounter configuration errors.
 *
 * @public
 */
export class CaseConfigurationError extends Error {
  constructor(message: string, context?: LogLevelContext) {
    super(`${message}${context ? errorLocationString(context) : ''}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseConfigurationError';
  }
}
