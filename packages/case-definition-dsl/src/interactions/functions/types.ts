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
   * A test equivalence matcher for the return value from this function
   */
  readonly returnValue: AnyMatcherOrData;

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
   * A test equivalence matcher for the class name of this exception
   */
  readonly kind: AnyMatcherOrData;
  /**
   * A test equivalence matcher for the message from this exception.
   * In general, it's best to rely on the class of the exception instead of the specific error message
   */
  readonly message?: AnyMatcherOrData;

  /**
   * The name of the function to be executed. Doubles as the handle used by
   * registerFunction.
   */
  readonly functionName: string;
}
