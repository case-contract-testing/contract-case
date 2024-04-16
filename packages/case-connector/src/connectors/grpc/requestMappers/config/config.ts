import {
  JavaScriptValue,
  Struct,
} from 'google-protobuf/google/protobuf/struct_pb';
import { StringValue } from 'google-protobuf/google/protobuf/wrappers_pb';
import {
  ContractResponse,
  TriggerFunctionHandle,
  TriggerFunctionRequest,
  ContractCaseConfig as WireContractCaseConfig,
} from '../../proto/contract_case_stream_pb';

import {
  ConnectorTriggerFunction,
  ContractCaseConnectorConfig,
} from '../../../../domain/types';
import { mapStateHandlers } from './stateHandlers';
import { ConnectorError } from '../../../../domain/errors';
import {
  makeResolvableId,
  waitForResolution,
} from '../../promiseHandler/promiseHandler';
import { SendContractResponse } from '../../sendContractResponse';
import { unbox, unboxBoolOrUndefined, unboxOrUndefined } from '../values';

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
  // ConnectorTriggerFunction;
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
