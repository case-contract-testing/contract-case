import { AnyMockDescriptor } from '@contract-case/case-entities-internal';
import { AnyState } from '@contract-case/case-core';
import { BoundaryStateHandler, ITriggerFunction } from '../entities/types.js';

export type ConnectorStateHandler = BoundaryStateHandler;

export type ConnectorTriggerFunction = ITriggerFunction;

export type ContractCaseConnectorConfig = {
  providerName: string;
  consumerName: string;
  logLevel: string;
  contractDir: string;
  contractFilename: string;

  publish: string;
  brokerCiAccessToken: string;
  brokerBaseUrl: string;
  brokerBasicAuth?: { username: string; password: string };

  baseUrlUnderTest: string;
  printResults: boolean;
  throwOnFail: boolean;

  stateHandlers: Record<string, ConnectorStateHandler>;
  triggerAndTests: Record<string, ConnectorTriggerFunction>;
  triggerAndTest: ConnectorTriggerFunction;

  mockConfig: Record<string, Record<string, unknown>>;
};

export type DefinitionId = string;
export type VerificationId = string;

export type ExampleDefinition = {
  readonly states: Array<AnyState>;
  readonly definition: AnyMockDescriptor;
};
