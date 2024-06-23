const MESSAGE = 'Failed while verifying object returned by trigger:';

/**
 * This is thrown by ContractCase core to indicate that the user-provided
 * verification function failed
 *
 * @public
 */
export class VerifyTriggerReturnObjectError extends Error {
  override cause: unknown;

  constructor(cause: unknown) {
    const maybeError = cause as Error;

    if (typeof maybeError === 'object' && 'message' in maybeError) {
      super(`${MESSAGE}\n\n${maybeError.message}`);
      if (maybeError.stack) this.stack = maybeError.stack;
    } else {
      super(`${MESSAGE}\n\n${cause}`);
    }

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = VerifyTriggerReturnObjectError.name;

    this.cause = cause;
  }
}
