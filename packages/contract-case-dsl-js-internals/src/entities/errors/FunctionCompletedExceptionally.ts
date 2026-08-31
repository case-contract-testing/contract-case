/**
 * Thrown by a mock function (during contract definition) when the contract
 * describes the function as throwing an error. Carries the details of the
 * error as described by the contract.
 *
 * @public
 */
export class FunctionCompletedExceptionally extends Error {
  /** The class name of the error, as described by the contract */
  readonly errorClassName: string;

  /** The message of the error as described by the contract, if any */
  readonly exceptionMessage: string | undefined;

  /**
   * The serialised content of the error as described by the contract, if any.
   * This is the example error internals from the contract's errorInternals matcher, or
   * undefined if the contract did not describe error internals for this error.
   */
  readonly errorInternals: unknown;

  constructor(
    errorClassName: string,
    exceptionMessage: string | undefined,
    errorInternals: unknown,
  ) {
    super(
      `Function completed exceptionally: ${errorClassName}${
        exceptionMessage != null ? ` ${exceptionMessage}` : ''
      }`,
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'FunctionCompletedExceptionally';
    this.errorClassName = errorClassName;
    this.exceptionMessage = exceptionMessage;
    this.errorInternals = errorInternals;
  }
}
