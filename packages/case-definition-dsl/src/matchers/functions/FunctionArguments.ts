import { FUNCTION_ARGUMENTS_MATCHER_TYPE } from '@contract-case/case-core-plugin-function-dsl';
import { AnyMatcherOrData } from '../../types';
import { AnyMatcher } from '../base';

/**
 * Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.
 *
 * Usually you don't need to use this matcher directly, the mock creates it for you.
 *
 * @public
 */
export class FunctionArguments extends AnyMatcher {
  arguments: AnyMatcherOrData[];

  /**
   * Matches function arguments, for use with a FunctionExecutionMock
   * @param expectedArguments - an array where each entry will be matched against the arguments
   */
  constructor(expectedArguments: AnyMatcherOrData[]) {
    super(FUNCTION_ARGUMENTS_MATCHER_TYPE);
    this.arguments = expectedArguments;
  }

  /**
   * For non-TypeScript implementations (see `AnyMatcher.toJSON`)
   *
   * @privateRemarks
   * This comment and the implementation is boilerplate on all matchers to avoid
   * outputting duplicate unimportant documentation on all matcher classes of
   * the docs. Only modify this comment or the implementation via search and replace.
   */
  override toJSON(): unknown {
    return super.toJSON();
  }
}
