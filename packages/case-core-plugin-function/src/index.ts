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
  MockFunctionExecutionDescriptor,
  FunctionMockSetupInfo,
} from '@contract-case/case-core-plugin-function-dsl';

import { pluginVersion } from './version';
import { FunctionArgumentMatcherExecutor } from './matchers/FunctionArgumentsMatcher';
import { setupMockFunctionExecution } from './mocks';

export * from './matchers';
export * from './mocks';
export * from './mocks/types';

const CoreHttpPlugin: ContractCasePlugin<
  typeof FUNCTION_ARGUMENTS_MATCHER_TYPE,
  typeof MOCK_FUNCTION_EXECUTION,
  CoreFunctionArgumentsMatcher,
  MockFunctionExecutionDescriptor,
  FunctionMockSetupInfo
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
  },
};

export default CoreHttpPlugin;
