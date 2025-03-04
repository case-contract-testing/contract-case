import { AnyMatcherOrData } from '../../types';

/**
 * Example descriptor for a function execution
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
 * Example descriptor for a function execution that can be called by ContractCase
 *
 * @public
 */
export interface FunctionExecutionExampleWithHandle {
  /**
   * An array of expected function arguments (or test equivalence matchers for those arguments)
   */
  readonly arguments: AnyMatcherOrData[];
  /**
   * A test equivalence matcher for the return value from this function
   */
  readonly returnValue: AnyMatcherOrData;
}
