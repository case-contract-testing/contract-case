/*!
 * ContractCase Core HTTP Plugin
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

import { ContractCasePlugin } from '@contract-case/case-plugin-base';
import {
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
  MOCK_FUNCTION_EXECUTION,
  CoreFunctionArgumentsMatcher,
  MOCK_FUNCTION_CALLER,
  FUNCTION_RESULT_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';

import { FunctionArgumentMatcherExecutor } from './matchers/FunctionArgumentsMatcher';
import { setupMockFunctionCaller, setupMockFunctionExecution } from './mocks';
import { AllDescriptors, AllSetup } from './mocks/types';
import { description } from './description';
import { FunctionResultMatcherExecutor } from './matchers';

export * from './matchers';
export * from './mocks';

const CoreHttpPlugin: ContractCasePlugin<
  typeof FUNCTION_ARGUMENTS_MATCHER_TYPE | typeof FUNCTION_RESULT_MATCHER_TYPE,
  typeof MOCK_FUNCTION_EXECUTION | typeof MOCK_FUNCTION_CALLER,
  CoreFunctionArgumentsMatcher,
  AllDescriptors,
  AllSetup
> = {
  description,
  matcherExecutors: {
    [FUNCTION_ARGUMENTS_MATCHER_TYPE]: FunctionArgumentMatcherExecutor,
    [FUNCTION_RESULT_MATCHER_TYPE]: FunctionResultMatcherExecutor,
  },
  setupMocks: {
    [MOCK_FUNCTION_EXECUTION]: setupMockFunctionExecution,
    [MOCK_FUNCTION_CALLER]: setupMockFunctionCaller,
  },
};

export default CoreHttpPlugin;
