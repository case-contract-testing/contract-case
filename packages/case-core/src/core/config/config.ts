import type { RunContext } from '../../entities/types';

import type { CaseConfig } from './types';

const ENV_TO_CONFIG_KEY: Record<string, keyof CaseConfig> = {
  CASE_BROKER_BASEURL: 'brokerBaseUrl',
  CASE_BROKER_CI_TOKEN: 'brokerCiAccessToken',
};

const configFromEnv = (): CaseConfig =>
  Object.entries(ENV_TO_CONFIG_KEY)
    .filter(([envKey]) => process.env[envKey] !== undefined)
    .map(([envKey, configKey]) => ({
      [configKey]: process.env[envKey],
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

const transformConfig = (config: CaseConfig): RunContext =>
  Object.entries(config)
    .map(([k, v]) => ({
      [`case:currentRun:context:${k}`]: v,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as RunContext);

export const configToRunContext = (
  config: CaseConfig
): Partial<RunContext> => ({
  ...transformConfig(configFromEnv()),
  ...transformConfig(config),
});
