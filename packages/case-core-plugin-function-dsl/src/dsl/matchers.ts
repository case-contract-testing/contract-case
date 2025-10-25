import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

export const FUNCTION_ARGUMENTS_MATCHER_TYPE =
  '_case:FunctionArgumentsMatcher' as const;

export const FUNCTION_RESULT_MATCHER_TYPE =
  '_case:FunctionResultMatcher' as const;

export interface CoreFunctionArgumentsMatcher {
  '_case:matcher:type': typeof FUNCTION_ARGUMENTS_MATCHER_TYPE;
  arguments: AnyCaseMatcherOrData[];
  functionName: string;
}

/**
 * Matches a return value from a function
 */
export interface CoreFunctionSuccessResultMatcher {
  '_case:matcher:type': typeof FUNCTION_RESULT_MATCHER_TYPE;
  success: AnyCaseMatcherOrData;
}

/**
 * Matches an error result
 */
export interface CoreFunctionErrorResultMatcher {
  '_case:matcher:type': typeof FUNCTION_RESULT_MATCHER_TYPE;
  errorClassName: AnyCaseMatcherOrData;
  message?: AnyCaseMatcherOrData;
}

export const functionArgumentsMatcher = (
  expectedArguments: AnyCaseMatcherOrData[],
  functionName: string,
  invocationName: string | undefined,
): CoreFunctionArgumentsMatcher => ({
  '_case:matcher:type': FUNCTION_ARGUMENTS_MATCHER_TYPE,
  ...(invocationName ? { '_case:matcher:uniqueName': invocationName } : {}),
  arguments: expectedArguments,
  functionName,
});

export const functionReturnSuccessMatcher = (
  returnValue: AnyCaseMatcherOrData,
  responseName: string | undefined,
): CoreFunctionSuccessResultMatcher => ({
  '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
  ...(responseName ? { '_case:matcher:uniqueName': responseName } : {}),
  success: returnValue,
});

export const functionThrowsErrorMatcher = (
  errorClassName: AnyCaseMatcherOrData,
  message?: AnyCaseMatcherOrData,
  responseName?: string | undefined,
): CoreFunctionErrorResultMatcher => ({
  '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
  ...(responseName ? { '_case:matcher:uniqueName': responseName } : {}),
  errorClassName,
  ...(message != null ? { message } : {}),
});
