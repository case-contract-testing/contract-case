import { RunContext } from '@contract-case/case-plugin-base';
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
  if (s == null) return s;
  switch (s.toLowerCase()) {
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

/**
 * This function takes a CaseConfig object and turns it into the appropriate
 * RunContext values.
 *
 * Most of the time, this is a passthrough of the config property
 * to a corresponding currentRun:config property.
 *
 * Occasionally you'll want to do explicit processing beyond this, however.
 *
 * @param config - the configuration object to map
 * @returns a Partial RunContext object with anything that was set by the Config
 */
export const configToRunContext = (config: CaseConfig): Partial<RunContext> =>
  Object.entries(config)
    .map(([k, v]) => ({
      [`_case:currentRun:context:${k}`]: v,
    }))
    .reduce<Partial<RunContext>>((acc, curr) => ({ ...acc, ...curr }), {
      '_case:currentRun:context:connectorClient':
        process.env['CASE_CONNECTOR_CLIENT'] ?? 'No Connector Client Supplied',
      '_case:currentRun:context:location': config.coreLogContextPrefix
        ? [config.coreLogContextPrefix]
        : [],
    });
