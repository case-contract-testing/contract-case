import { Map as PbMap } from 'google-protobuf';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import {
  ContractResponse,
  CoreFunctionHandle,
  SetupInfo,
  TriggerFunctionHandle,
  TriggerFunctionRequest,
  ContractCaseConfig as WireContractCaseConfig,
} from '@contract-case/case-connector-proto';

import {
  ConnectorTriggerFunction,
  ContractCaseConnectorConfig,
} from '../../../../domain/types.js';
import { mapStateHandlers } from './stateHandlers.js';
import { ConnectorError } from '../../../../domain/errors/index.js';
import {
  makeResolvableId,
  waitForResolution,
} from '../../promiseHandler/promiseHandler.js';
import { SendContractResponse } from '../../sendContractResponse.js';
import { unbox, unboxBoolOrUndefined, unboxOrUndefined } from '../values.js';
import { BoundarySetupInfo } from '../../../case-boundary/internals/index.js';
import { FunctionRegistry } from '../../functionRegistry/types.js';

const mapSetupInfo = (
  boundarySetup: BoundarySetupInfo,
  functionRegistry: FunctionRegistry,
): SetupInfo => {
  const setup = new SetupInfo();
  Object.entries(boundarySetup.mock).forEach(([key, value]) => {
    setup.getMockMap().set(key, new StringValue().setValue(value));
  });
  Object.entries(boundarySetup.stateVariables).forEach(([key, value]) => {
    setup.getStateVariablesMap().set(key, new StringValue().setValue(value));
  });
  Object.entries(boundarySetup.functions).forEach(([name, fn]) => {
    setup
      .getFunctionsMap()
      .set(
        name,
        new CoreFunctionHandle().setHandle(new StringValue().setValue(name)),
      );
    functionRegistry.registerCoreFunction(name, fn);
  });
  return setup;
};

const mapTriggerFunction = (
  handle: TriggerFunctionHandle,
  executeCall: SendContractResponse,
  functionRegistry: FunctionRegistry,
) => ({
  trigger: (withConfig: BoundarySetupInfo) =>
    waitForResolution(
      makeResolvableId((id: string) => {
        if (Array.isArray(handle)) {
          // TODO: Figure out why this is sometimes an array instead of a handle
          return executeCall(
            'maintainerDebug',
            id,
            new ContractResponse().setTriggerFunctionRequest(
              new TriggerFunctionRequest()
                .setTriggerFunction(
                  new TriggerFunctionHandle().setHandle(
                    new StringValue().setValue(handle[0][0]),
                  ),
                )
                .setSetup(mapSetupInfo(withConfig, functionRegistry)),
            ),
          );
        }

        return executeCall(
          'maintainerDebug',
          id,
          new ContractResponse().setTriggerFunctionRequest(
            new TriggerFunctionRequest()
              .setTriggerFunction(
                new TriggerFunctionHandle().setHandle(handle.getHandle()),
              )
              .setSetup(mapSetupInfo(withConfig, functionRegistry)),
          ),
        );
      }),
    ),
});

const mapTriggerAndTest = (
  config: WireContractCaseConfig,
  executeCall: SendContractResponse,
  functionRegistry: FunctionRegistry,
) => {
  const trigger = config.getTriggerAndTest();
  return trigger !== undefined
    ? mapTriggerFunction(trigger, executeCall, functionRegistry)
    : undefined;
};

const mapBasicAuth = (
  basicAuth: WireContractCaseConfig.UsernamePassword | undefined,
): { username: string; password: string } | undefined => {
  if (basicAuth == null) {
    return undefined;
  }

  return {
    username: unbox(basicAuth.getUsername()),
    password: unbox(basicAuth.getPassword()),
  };
};

const mapMockConfig = (
  wireMockConfig: PbMap<string, string>,
): Record<string, Record<string, unknown>> =>
  wireMockConfig
    .getEntryList()
    .reduce(
      (curr, [key, value]) => ({ ...curr, [key]: JSON.parse(value) }),
      {} as Record<string, Record<string, unknown>>,
    );

const mapContractsToWrite = (
  contractsToWrite: StringValue[],
): string[] | undefined => {
  const mapped = contractsToWrite.map((sv) => unbox(sv));
  return mapped.length !== 0 ? mapped : undefined;
};

type WithUndefined<T> = {
  [P in keyof T]-?: T[P] | undefined;
};

const mapAllConfigFields = (
  config: WireContractCaseConfig,
  executeCall: SendContractResponse,
  functionRegistry: FunctionRegistry,
): WithUndefined<ContractCaseConnectorConfig> => ({
  providerName: unboxOrUndefined(config.getProviderName()),
  consumerName: unboxOrUndefined(config.getConsumerName()),
  logLevel: unboxOrUndefined(config.getLogLevel()),
  contractDir: unboxOrUndefined(config.getContractDir()),
  contractFilename: unboxOrUndefined(config.getContractFilename()),
  contractsToWrite: mapContractsToWrite(config.getContractsToWriteList()),
  changedContracts: unboxOrUndefined(config.getChangedContracts()),

  publish: unboxOrUndefined(config.getPublish()),
  brokerCiAccessToken: unboxOrUndefined(config.getBrokerCiAccessToken()),
  brokerBaseUrl: unboxOrUndefined(config.getBrokerBaseUrl()),
  brokerBasicAuth: mapBasicAuth(config.getBrokerBasicAuth()),

  baseUrlUnderTest: unboxOrUndefined(config.getBaseUrlUnderTest()),
  printResults: unboxBoolOrUndefined(config.getPrintResults()),
  throwOnFail: unboxBoolOrUndefined(config.getThrowOnFail()),

  stateHandlers: mapStateHandlers(config.getStateHandlersList(), executeCall),
  triggerAndTests: config
    .getTriggerAndTestsMap()
    .toArray()
    .reduce<Record<string, ConnectorTriggerFunction>>(
      (acc: Record<string, ConnectorTriggerFunction>, [key, handler]) => ({
        ...acc,
        [key]: mapTriggerFunction(handler, executeCall, functionRegistry),
      }),
      {} as Record<string, ConnectorTriggerFunction>,
    ),
  triggerAndTest: mapTriggerAndTest(config, executeCall, functionRegistry),
  mockConfig: mapMockConfig(config.getMockConfigMap()),

  autoVersionFrom: unboxOrUndefined(config.getAutoVersionFrom()),
  adviceOverrides: config
    .getAdviceOverridesMap()
    .toArray()
    .reduce<Record<string, string>>(
      (acc: Record<string, string>, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
});

export const mapConfig = (
  config: WireContractCaseConfig | undefined,
  executeCall: SendContractResponse,
  functionRegistry: FunctionRegistry,
): ContractCaseConnectorConfig => {
  if (config === undefined) {
    throw new ConnectorError('Config object must be provided');
  }

  return Object.entries(
    mapAllConfigFields(config, executeCall, functionRegistry),
  ).reduce<ContractCaseConnectorConfig>(
    // Kill any fields that are empty strings or otherwise undefined
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== '' && value !== undefined ? { [key]: value } : {}),
    }),
    {} as ContractCaseConnectorConfig,
  );
};
