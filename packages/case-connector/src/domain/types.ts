import {
  BoundaryStateHandler,
  ITriggerFunction,
  TsBoundaryMockDefinition,
} from '@contract-case/case-boundary';

export type ConnectorStateHandler = BoundaryStateHandler;

type ConnectorTriggerFunction = ITriggerFunction;

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
};

export type DefinitionId = string;
export type VerificationId = string;

export type ExampleDefinition = TsBoundaryMockDefinition;
