/*!
 * ContractCase DSL JS - User-facing DSL for ContractCase test framework bindings
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

export { ContractCaseDefiner } from './connectors/ContractDefiner.js';
export type { ExampleDefinition } from './connectors/ContractDefiner.js';
export { ContractVerifier } from './connectors/ContractVerifier.js';
export { TriggerGroupMap } from './connectors/TriggerGroup.js';

export * from './boundaries/dsl/index.js';

export * as Matchers from './boundaries/dsl/Matchers/index.js';
export * as Interactions from './boundaries/dsl/Interactions/index.js';
export * as States from './boundaries/dsl/States/index.js';

// Re-export entity types from connector-js
export type {
  ContractCaseConfig,
  ContractCaseVerifierConfig,
  IndividualSuccessTestConfig,
  IndividualFailedTestConfig,
  LogLevel,
  UserNamePassword,
  SetupFunction,
  TeardownFunction,
  ContractWriteSuccess,
  StateHandler,
  StateHandlers,
  ContractDescription,
  VerificationTestHandle,
  ContractMetadata,
  VerificationHandle,
  InteractionSetup,
  Trigger,
  TestResponseFunction,
  TestErrorResponseFunction,
  TriggerGroup,
  TriggerGroups,
  Groups,
  InferredTriggerPair,
} from '@contract-case/contract-case-connector-js';

export {
  ContractCaseConfigurationError,
  ContractCaseCoreError,
  ContractCaseExpectationsNotMet,
  versionString,
} from '@contract-case/contract-case-connector-js';
