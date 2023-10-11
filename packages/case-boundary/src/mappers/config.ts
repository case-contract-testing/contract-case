import {
  AnyMockDescriptorType,
  CaseConfig,
  CaseConfigurationError,
  LogLevel,
} from '@contract-case/case-core';
import { TestInvoker } from '@contract-case/case-core/dist/src/core/executeExample/types';
import { ContractCaseBoundaryConfig } from '../boundary/config.types';
import { mapStateHandlers } from './stateHandlers';
import { mapTrigger, mapTriggers } from './triggers';

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
        `The log level '${levelString}' is not a valid LogLevel`,
      );
  }
};

const mapPublish = (
  publishString: string | boolean | undefined,
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
        `The publish value '${publishString}' is not a valid publish setting`,
      );
  }
};

type SeparateConfig = {
  config: CaseConfig;
  partialInvoker: Partial<TestInvoker<AnyMockDescriptorType, unknown>>;
};

export const convertConfig = ({
  stateHandlers,
  triggerAndTest,
  triggerAndTests,
  logLevel,
  publish,
  ...incoming
}: ContractCaseBoundaryConfig): SeparateConfig => ({
  config: {
    ...incoming,
    ...(logLevel ? { logLevel: mapLogLevel(logLevel) } : {}),
    ...(publish ? { publish: mapPublish(publish) } : {}),
    // baseUrlUnderTest: `http://localhost:${8084}`,
  },
  partialInvoker: {
    ...(stateHandlers
      ? {
          stateHandlers: mapStateHandlers(stateHandlers),
        }
      : {}),
    ...(triggerAndTest
      ? {
          triggerAndTest: mapTrigger(triggerAndTest),
        }
      : {}),
    ...(triggerAndTests
      ? {
          triggerAndTests: mapTriggers(triggerAndTests),
        }
      : {}),
  },
});
