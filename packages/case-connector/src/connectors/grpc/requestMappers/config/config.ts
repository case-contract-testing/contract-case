import {
  JavaScriptValue,
  Struct,
} from 'google-protobuf/google/protobuf/struct_pb';
import {
  DefinitionResponse,
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
import { ExecuteCall } from '../../executeCall';

const mapTriggerFunction = (
  handle: TriggerFunctionHandle,
  executeCall: ExecuteCall,
) => ({
  trigger: (withConfig: Record<string, unknown>) =>
    waitForResolution(
      makeResolvableId((id: string) =>
        executeCall(
          id,
          new DefinitionResponse().setTriggerFunctionRequest(
            new TriggerFunctionRequest()
              .setTriggerFunction(handle)
              .setConfig(
                Struct.fromJavaScript(
                  withConfig as Record<string, JavaScriptValue>,
                ),
              ),
          ),
        ),
      ),
    ),
});

const mapTriggerAndTest = (
  config: WireContractCaseConfig,
  executeCall: ExecuteCall,
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
    username: basicAuth.getUsername(),
    password: basicAuth.getPassword(),
  };
};

type WithUndefined<T> = {
  [P in keyof T]-?: T[P] | undefined;
};

const mapAllConfigFields = (
  config: WireContractCaseConfig,
  executeCall: ExecuteCall,
): WithUndefined<ContractCaseConnectorConfig> => ({
  providerName: config.getProviderName(),
  consumerName: config.getConsumerName(),
  logLevel: config.getLogLevel(),
  contractDir: config.getContractDir(),
  contractFilename: config.getContractFilename(),

  publish: config.getPublish(),
  brokerCiAccessToken: config.getBrokerCiAccessToken(),
  brokerBaseUrl: config.getBrokerBaseUrl(),
  brokerBasicAuth: mapBasicAuth(config.getBrokerBasicAuth()),

  baseUrlUnderTest: config.getBaseUrlUnderTest(),
  printResults: config.getPrintResults(),
  throwOnFail: config.getThrowOnFail(),

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
  executeCall: ExecuteCall,
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
