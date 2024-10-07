import {
  JavaScriptValue,
  Struct,
} from 'google-protobuf/google/protobuf/struct_pb.js';
import { Map as PbMap } from 'google-protobuf';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb.js';
import {
  ContractResponse,
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

const mapTriggerFunction = (
  handle: TriggerFunctionHandle,
  executeCall: SendContractResponse,
) => ({
  trigger: (withConfig: Record<string, unknown>) =>
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
                .setConfig(
                  Struct.fromJavaScript(
                    withConfig as Record<string, JavaScriptValue>,
                  ),
                ),
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
              .setConfig(
                Struct.fromJavaScript(
                  withConfig as Record<string, JavaScriptValue>,
                ),
              ),
          ),
        );
      }),
    ),
});

const mapTriggerAndTest = (
  config: WireContractCaseConfig,
  executeCall: SendContractResponse,
) => {
  const trigger = config.getTriggerAndTest();
  return trigger !== undefined
    ? mapTriggerFunction(trigger, executeCall)
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

type WithUndefined<T> = {
  [P in keyof T]-?: T[P] | undefined;
};

const mapAllConfigFields = (
  config: WireContractCaseConfig,
  executeCall: SendContractResponse,
): WithUndefined<ContractCaseConnectorConfig> => ({
  providerName: unboxOrUndefined(config.getProviderName()),
  consumerName: unboxOrUndefined(config.getConsumerName()),
  logLevel: unboxOrUndefined(config.getLogLevel()),
  contractDir: unboxOrUndefined(config.getContractDir()),
  contractFilename: unboxOrUndefined(config.getContractFilename()),

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
        [key]: mapTriggerFunction(handler, executeCall),
      }),
      {} as Record<string, ConnectorTriggerFunction>,
    ),
  triggerAndTest: mapTriggerAndTest(config, executeCall),
  mockConfig: mapMockConfig(config.getMockConfigMap()),
});

export const mapConfig = (
  config: WireContractCaseConfig | undefined,
  executeCall: SendContractResponse,
): ContractCaseConnectorConfig => {
  if (config === undefined) {
    throw new ConnectorError('Config object must be provided');
  }

  return Object.entries(
    mapAllConfigFields(config, executeCall),
  ).reduce<ContractCaseConnectorConfig>(
    // Kill any fields that are empty strings or otherwise undefined
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== '' && value !== undefined ? { [key]: value } : {}),
    }),
    {} as ContractCaseConnectorConfig,
  );
};
