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
}
