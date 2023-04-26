import {
  CaseConfig,
  CaseConfigurationError,
  LogLevel,
} from '@contract-case/case-core';
import { ContractCaseBoundaryConfig } from '../boundary/config.types';

const mapLogLevel = (levelString: string | undefined): LogLevel | undefined => {
  switch (levelString) {
    case 'warn':
    case 'error':
    case 'debug':
    case 'maintainerDebug':
    case 'deepMaintainerDebug':
      return levelString;
    case undefined:
      return undefined;
    default:
      throw new CaseConfigurationError(
        `The log level '${levelString}' is not a valid LogLevel`
      );
  }
};

const mapPublish = (
  publishString: string | boolean | undefined
): false | true | 'ONLY_IN_CI' | 'NEVER' | 'ALWAYS' | undefined => {
  switch (publishString) {
    case 'ONLY_IN_CI':
      return 'ONLY_IN_CI';
    case false:
    case 'NEVER':
      return 'NEVER';
    case true:
    case 'ALWAYS':
      return 'ALWAYS';
    case undefined:
      return undefined;
    default:
      throw new CaseConfigurationError(
        `The publish value '${publishString}' is not a valid publish setting`
      );
  }
};

export const convertConfig = (
  incoming: ContractCaseBoundaryConfig
): CaseConfig => ({
  ...incoming,
  logLevel: mapLogLevel(incoming.logLevel),
  publish: mapPublish(incoming.publish),
});
