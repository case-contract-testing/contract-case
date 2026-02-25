import type { InteractionSetup } from '@contract-case/contract-case-dsl-js';

/*!
 * ContractCase Vitest DSL
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

// Re-export all shared DSL code
export * from '@contract-case/contract-case-dsl-js';

// Re-export vitest-specific bindings
export * from './boundaries/index.js';

// Namespace re-exports for backward compatibility
export * as dsl from '@contract-case/contract-case-dsl-js';
export * as TestEquivalenceMatchers from '@contract-case/contract-case-dsl-js';

process.env['CASE_CONNECTOR_CLIENT'] = 'contract-case-vitest';

// TODO remove this hack type and do it properly
export type HttpRequestConfig = InteractionSetup<{
  baseUrl: string;
}>;

// TODO remove this hack type too, and also do it properly
export type FunctionExecutorConfig = InteractionSetup<{
  functionHandle: string;
}>;
