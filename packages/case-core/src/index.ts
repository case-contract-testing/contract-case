import { HttpRequestConsumerSetup } from '@contract-case/case-core-plugin-http-dsl';
import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import {
  AnyLeafOrStructure,
  BaseSetupInfo,
} from '@contract-case/case-plugin-dsl-types';

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
export type {
  LogLevel,
  ConfigurationErrorCode,
} from '@contract-case/case-plugin-base';

export { CaseFailedAssertionError } from './entities';

export {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
  ResultPrinter,
} from './entities/types';

export {
  CaseConfigurationError,
  CaseCoreError,
  CaseTriggerError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-plugin-base';
export type {
  AnyMockDescriptorType,
  AnyMockDescriptor,
} from '@contract-case/case-entities-internal';

export type AnyCaseMatcherOrData = AnyCaseMatcher | AnyLeafOrStructure;

export * from './connectors';

export type HttpRequestConfig = HttpRequestConsumerSetup;

export type { BaseSetupInfo };
