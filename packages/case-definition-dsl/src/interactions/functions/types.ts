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
   * A human-readable name for this specific error instance, if any.
   *
   * Useful for identifying this error response in verification trigger groups.
   *
   * If you provide a responseName, it must only be used by error matchers that
   * have exactly the same definition. If you don't provide a responseName, it
   * will be generated from the shape of the provided error.
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
   * This feature exists in case you need to differentiate by some error code
   * on the error type, but in general it's not recommended to rely on the
   * internals of your error data. Instead, we recommend explicit error types
   * for each kind of error that callers might care about, and to match on the
   * `errorClassName` instead. Matching on the error internals couples the
   * contract to the internal structure of the error, and should only be used
   * as a last resort.
   */
  readonly errorInternals?: AnyMatcherOrData;

  /**
   * The name of the function to be executed. Doubles as the handle used by
   * registerFunction.
   */
  readonly functionName: string;
}
