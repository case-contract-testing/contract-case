import { TriggerConfig } from './entities/index.js';

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

// TODO remove this hack type and do it properly
export type HttpRequestConfig = TriggerConfig<{
  baseUrl: string;
}>;
