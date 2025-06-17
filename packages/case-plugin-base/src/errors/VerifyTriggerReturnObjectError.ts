const MESSAGE = 'Failed while verifying object returned by trigger:';

/**
 * This is thrown by ContractCase core to indicate that the user-provided
 * verification function failed
 *
 * @public
 */
export class VerifyTriggerReturnObjectError extends Error {
  override cause: unknown;

  userFacingStackTrace: string;

  constructor(cause: unknown, userFacingStackTrace?: string) {
    const maybeError = cause as Error;
    if (typeof maybeError === 'object' && 'message' in maybeError) {
      super(`${MESSAGE}\n${maybeError.message}\n`, { cause });
      this.userFacingStackTrace =
        'userFacingStackTrace' in maybeError &&
        typeof maybeError.userFacingStackTrace === 'string'
          ? maybeError.userFacingStackTrace
          : '';
    } else {
      super(`${MESSAGE}\n${cause}\n`);
      this.userFacingStackTrace = userFacingStackTrace ?? '';
    }
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'VerifyTriggerReturnObjectError';

    this.cause = cause;
  }
}
