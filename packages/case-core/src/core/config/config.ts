import type { RunContext } from '../../entities/types';

import { CaseConfig, stringConfigArgs } from './types';

const ENV_TO_CONFIG_KEY: Record<string, keyof CaseConfig> = {
  CASE_BROKER_BASEURL: 'brokerBaseUrl',
  CASE_BROKER_CI_TOKEN: 'brokerCiAccessToken',
  ...stringConfigArgs
    .map((configKey) => ({
      [`CASE_${configKey}`]: configKey,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
};

const value = (s: string | undefined) => {
  switch (s) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return s;
  }
};

export const configFromEnv = (): CaseConfig =>
  Object.entries(ENV_TO_CONFIG_KEY)
    .filter(([envKey]) => process.env[envKey] !== undefined)
    .map(([envKey, configKey]) => ({
      [configKey]: value(process.env[envKey]),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

export const configToRunContext = (config: CaseConfig): Partial<RunContext> =>
  Object.entries(config)
    .map(([k, v]) => ({
      [`_case:currentRun:context:${k}`]: v,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as Partial<RunContext>);
