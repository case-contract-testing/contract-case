import { AnyMatcherOrData } from '../../types';

/**
 * Interaction descriptor for a function execution which returns successfully
 *
 * @public
 */
export interface FunctionExecutionExample {
  /**
   * An array of expected function arguments (or test equivalence matchers for those arguments)
   */
  readonly arguments: AnyMatcherOrData[];

  /**
   * A name for this specific combination of arguments - must be unique in this contract.
   */
  readonly invocationName?: string;

  /**
   * A test equivalence matcher for the return value from this function
   */
  readonly returnValue: AnyMatcherOrData;

  /**
   * A name for this specific return value - must be unique in this contract.
   */
  readonly responseName?: string;

  /**
   * The name of the function to be executed. Doubles as the handle used by
   * registerFunction.
   */
  readonly functionName: string;
}

/**
 * Interaction descriptor for a function execution that throws an error
 *
 * @public
 */
export interface ThrowingFunctionExecutionExample {
  /**
   * An array of expected function arguments (or test equivalence matchers for those arguments)
   */
  readonly arguments: AnyMatcherOrData[];

  /**
   * A name for this specific combination of arguments - must be unique in this contract.
   */
  readonly invocationName?: string;

  /**
   * A test equivalence matcher for the class name of this exception
   */
  readonly errorClassName: AnyMatcherOrData;

  /**
   * A name for this specific exception, must be unique in this
   */
  readonly responseName?: string;

  /**
   * A test equivalence matcher for the message from this exception.
   * In general, it's best to rely on the class of the exception instead of the specific error message
   */
  readonly message?: AnyMatcherOrData;

  /**
   * A test equivalence matcher for the serialised content of this exception.
   *
   * This should generally be a last resort - it is usually better to have
   * explicit, distinct error types for each kind of error that callers might
   * care about, and to match on `errorClassName` instead. Matching on the
   * errorInternals couples the contract to the internal structure of the error.
   */
  readonly errorInternals?: AnyMatcherOrData;

  /**
   * The name of the function to be executed. Doubles as the handle used by
   * registerFunction.
   */
  readonly functionName: string;
}
