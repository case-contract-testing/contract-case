import { TriggerSetup } from './entities/index.js';

/*!
 * ContractCase Jest DSL
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

export { ContractCaseDefiner } from './connectors/ContractDefiner.js';
export * from './boundaries/index.js';
export * as dsl from './boundaries/dsl/index.js';
export * as TestEquivalenceMatchers from './boundaries/dsl/Matchers/index.js';
export * from './entities/types.js';

process.env['CASE_CONNECTOR_CLIENT'] = 'contract-case-jest';

// TODO remove this hack type and do it properly
export type HttpRequestConfig = TriggerSetup<{
  baseUrl: string;
}>;

// TODO remove this hack type too, and also do it properly
export type FunctionExecutorConfig = TriggerSetup<{ functionHandle: string }>;
