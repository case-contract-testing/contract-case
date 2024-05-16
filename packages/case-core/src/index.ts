import type {
  ArbitraryConfig,
  Assertable,
  MOCK_HTTP_SERVER,
} from './entities/types';

/*!
 * ContractCase
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

export * from './boundaries';
export * from './boundaries/types';
export { CaseConfig } from './core/types';
export { TestInvoker, MultiTestInvoker } from './core/executeExample/types';
export { BrokerError } from './core';
export * from './entities/errors';
export {
  LogLevel,
  AnyMockDescriptor,
  CaseContractDescription,
} from './entities/types';

export * from './connectors';

export type HttpRequestConfig =
  | Assertable<typeof MOCK_HTTP_SERVER>['config']
  | ArbitraryConfig<typeof MOCK_HTTP_SERVER>;
