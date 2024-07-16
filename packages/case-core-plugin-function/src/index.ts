/*!
 * ContractCase Core HTTP Plugin
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

import {
  CORE_PLUGIN_PREFIX,
  ContractCasePlugin,
} from '@contract-case/case-plugin-base';
import {
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
  MOCK_FUNCTION_EXECUTION,
  CoreFunctionArgumentsMatcher,
  MOCK_FUNCTION_CALLER,
} from '@contract-case/case-core-plugin-function-dsl';

import { pluginVersion } from './version';
import { FunctionArgumentMatcherExecutor } from './matchers/FunctionArgumentsMatcher';
import { setupMockFunctionCaller, setupMockFunctionExecution } from './mocks';
import { AllDescriptors, AllSetup } from './mocks/types';

export * from './matchers';
export * from './mocks';

const CoreHttpPlugin: ContractCasePlugin<
  typeof FUNCTION_ARGUMENTS_MATCHER_TYPE,
  typeof MOCK_FUNCTION_EXECUTION | typeof MOCK_FUNCTION_CALLER,
  CoreFunctionArgumentsMatcher,
  AllDescriptors,
  AllSetup
> = {
  // Note: If using this code as an example for your own plugin,
  // DO NOT start your plugin name with the core plugin prefix
  // or ContractCase will not log debug information / load failures appropriately
  name: `${CORE_PLUGIN_PREFIX} function execution plugin`,
  version: pluginVersion,
  matcherExecutors: {
    [FUNCTION_ARGUMENTS_MATCHER_TYPE]: FunctionArgumentMatcherExecutor,
  },
  setupMocks: {
    [MOCK_FUNCTION_EXECUTION]: setupMockFunctionExecution,
    [MOCK_FUNCTION_CALLER]: setupMockFunctionCaller,
  },
};

export default CoreHttpPlugin;
