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
  errorKind: AnyCaseMatcherOrData;
  message?: AnyCaseMatcherOrData;
}

export const functionArgumentsMatcher = (
  expectedArguments: AnyCaseMatcherOrData[],
  functionName: string,
): CoreFunctionArgumentsMatcher => ({
  '_case:matcher:type': FUNCTION_ARGUMENTS_MATCHER_TYPE,
  arguments: expectedArguments,
  functionName,
});

export const functionReturnSuccessMatcher = (
  returnValue: AnyCaseMatcherOrData,
): CoreFunctionSuccessResultMatcher => ({
  '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
  success: returnValue,
});

export const functionThrowsErrorMatcher = (
  errorKind: AnyCaseMatcherOrData,
  message?: AnyCaseMatcherOrData,
): CoreFunctionErrorResultMatcher => ({
  '_case:matcher:type': FUNCTION_RESULT_MATCHER_TYPE,
  errorKind,
  ...(message != null ? { message } : {}),
});
