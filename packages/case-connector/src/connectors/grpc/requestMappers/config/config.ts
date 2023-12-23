import { ContractCaseConfig as WireContractCaseConfig } from '../../proto/contract_case_stream_pb';

import { ContractCaseConnectorConfig } from '../../../../domain/types';
import { mapStateHandlers } from './stateHandlers';
import { ConnectorError } from '../../../../domain/errors';

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

  stateHandlers: mapStateHandlers(config.getStateHandlersList()),
  triggerAndTests: {}, // Record<string, ConnectorTriggerFunction>;
  triggerAndTest: {
    trigger: () => Promise.reject(new Error('Not implemented')),
  }, // ConnectorTriggerFunction;
});

export const mapConfig = (
  config: WireContractCaseConfig | undefined,
): ContractCaseConnectorConfig => {
  if (config === undefined) {
    throw new ConnectorError('Config object must be provided');
  }

  return Object.entries(
    mapAllConfigFields(config),
  ).reduce<ContractCaseConnectorConfig>(
    // Kill any fields that are empty strings or otherwise undefined
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== '' && value !== undefined ? { [key]: value } : {}),
    }),
    {} as ContractCaseConnectorConfig,
  );
};
