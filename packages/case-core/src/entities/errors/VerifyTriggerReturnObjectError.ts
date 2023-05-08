const MESSAGE = 'Failed while verifying object returned by trigger:';

/**
 * The user-provided verification function failed
 */
export class VerifyTriggerReturnObjectError extends Error {
  override cause: unknown;

  constructor(cause: unknown) {
    const maybeError = cause as Error;

    if ('message' in maybeError) {
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
