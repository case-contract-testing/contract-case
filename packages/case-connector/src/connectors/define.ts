/**
 * Begin define
 *   - Begin define
 *      - Config
 *          - Statehandlers need to be callbacks
 *          - triggerAndTest needs to be a callback
 *      - LogPrinter is a callback
 *      - resultPrinter is a callback
 *      - Parent Versions
 *      - Returns ID
 *   - runExample
 *      Define ID
 *      json definition
 *      and config
 *   - runRejectingExample
 *      Define ID
 *      json definition
 *      and config
 *   - endRecord
 *      Define ID
 *      invalidates ID
 */

import { v4 as uuid4 } from 'uuid';
import {
  BoundaryContractDefiner,
  BoundaryFailure,
  BoundaryFailureKindConstants,
  BoundaryMockDefinition,
  BoundaryResult,
  BoundaryStateHandler,
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
  ITriggerFunction,
} from '@contract-case/case-boundary';
import { versionString } from '../versionString';

const ENDED_DEFINER = 'CLOSED' as const;

type DefinitionContainer =
  | { id: string; definer: BoundaryContractDefiner }
  | typeof ENDED_DEFINER;

type ContractCaseConnectorConfig = {
  providerName: string;
  consumerName: string;
  logLevel: string;
  contractDir: string;
  contractFilename: string;

  publish: string;
  brokerCiAccessToken: string;
  brokerBaseUrl: string;
  brokerBasicAuth: { username: string; password: string };

  baseUrlUnderTest: string;
  printResults: boolean;
  throwOnFail: boolean;

  stateHandlers: Record<string, BoundaryStateHandler>;
  triggerAndTests: Record<string, ITriggerFunction>;
  triggerAndTest: ITriggerFunction;
};

type DefinitionId = string;

type ExampleDefinition = BoundaryMockDefinition;

const DEFINING_CONTRACTS: Record<string, DefinitionContainer> = {};

const mapConfig = (
  config: ContractCaseConnectorConfig,
  testRunId: string,
): Required<ContractCaseBoundaryConfig> => ({ ...config, testRunId });

export const beginDefinition = (
  config: ContractCaseConnectorConfig,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
): DefinitionId => {
  const id = uuid4();
  const definer = {
    id,
    definer: new BoundaryContractDefiner(
      mapConfig(config, id),
      callbackPrinter,
      resultPrinter,
      [...callerVersions, versionString],
    ),
  };
  DEFINING_CONTRACTS[id] = definer;
  return id;
};

const makeCoreError = (message: string, location: string) =>
  new BoundaryFailure(
    BoundaryFailureKindConstants.CASE_CORE_ERROR,
    message,
    location,
  );

const makeConfigurationError = (message: string, location: string) =>
  new BoundaryFailure(
    BoundaryFailureKindConstants.CASE_CONFIGURATION_ERROR,
    message,
    location,
  );

const getDefiner = (defineId: DefinitionId, methodName: string) => {
  const definerHandle = DEFINING_CONTRACTS[defineId];
  if (definerHandle === undefined) {
    return makeCoreError(
      `The defineId '${defineId}' doesn't have an associated handle.\n\nThis might happen if the case-connector methods are called out of order, or the wrong connector is contacted`,
      `case-connector::${methodName}`,
    );
  }
  if (definerHandle === ENDED_DEFINER) {
    return makeConfigurationError(
      'runRejectingExample was called after endRecord was called',
      `case-connector::${methodName}`,
    );
  }
  return definerHandle;
};

export const runExample = (
  defineId: string,
  definition: ExampleDefinition,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'runExample');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.definer.runExample(
      definition,
      mapConfig(config, defineId),
    );
  });

export const runRejectingExample = (
  defineId: string,
  definition: ExampleDefinition,
  config: ContractCaseConnectorConfig,
): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'runRejectingExample');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.definer.runRejectingExample(
      definition,
      mapConfig(config, defineId),
    );
  });

export const endRecord = (defineId: string): Promise<BoundaryResult> =>
  Promise.resolve().then(() => {
    const definerHandle = getDefiner(defineId, 'runExample');
    if (!('id' in definerHandle)) {
      return definerHandle;
    }
    return definerHandle.definer.endRecord();
  });
