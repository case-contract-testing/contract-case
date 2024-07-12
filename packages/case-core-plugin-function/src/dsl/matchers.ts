import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-base';

export const FUNCTION_ARGUMENTS_MATCHER_TYPE =
  '_case:FunctionArgumentsMatcher' as const;

export interface CoreFunctionArgumentsMatcher {
  '_case:matcher:type': typeof FUNCTION_ARGUMENTS_MATCHER_TYPE;
  arguments: AnyCaseMatcherOrData[];
}

export const functionArgumentsMatcher = (
  expectedArguments: AnyCaseMatcherOrData[],
): CoreFunctionArgumentsMatcher => ({
  '_case:matcher:type': FUNCTION_ARGUMENTS_MATCHER_TYPE,
  arguments: expectedArguments,
});
