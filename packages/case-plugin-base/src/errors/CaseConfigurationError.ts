import type { LogLevelContext } from '../context/types';
import { errorLocationString } from './renderer';
import { ConfigurationErrorCode, ErrorCodes } from './ErrorCodes';

/**
 * Indicates that the user has configured ContractCase incorrectly.
 *
 * Throw this during mock setup if you encounter configuration errors.
 *
 * @public
 */
export class CaseConfigurationError extends Error {
  /**
   * The error code to help the user debug this
   */
  contractCaseErrorCode: ConfigurationErrorCode;

  /**
   * Constructs a CaseConfigurationError.
   *
   * @param message - the message for this error
   * @param context - the match context, used to add '(at $location)' to the
   * message. You can also pass 'DONT_ADD_LOCATION' if you don't want to append
   * this to the message.
   * @param code - an optional ConfigurationErrorCode to aid the user in debugging.
   */
  constructor(
    message: string,
    context: LogLevelContext | 'DONT_ADD_LOCATION',
    code: ConfigurationErrorCode = ErrorCodes.configuration.UNDOCUMENTED,
  ) {
    super(
      `${message}${context !== 'DONT_ADD_LOCATION' ? errorLocationString(context) : ''}`,
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'CaseConfigurationError';
    this.contractCaseErrorCode = code;
  }
}
