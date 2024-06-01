import { TriggerConfig } from './entities';

/*!
 * ContractCase Jest DSL
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

export { ContractCaseDefiner } from './connectors/ContractDefiner';
export * from './boundaries';
export * as dsl from './boundaries/dsl';
export * as TestEquivalenceMatchers from './boundaries/dsl/Matchers';
export * from './entities/types';

// TODO remove this hack type and do it properly
export type HttpRequestConfig = TriggerConfig<{
  baseUrl: string;
}>;
