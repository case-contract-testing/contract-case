import {
  AnyMockDescriptorType,
  CaseConfig,
  CaseConfigurationError,
  LogLevel,
} from '@contract-case/case-core';
import { TestInvoker } from '@contract-case/case-core/dist/src/core/executeExample/types.js';
import { ContractCaseBoundaryConfig } from '../boundary/config.types.js';
import { mapStateHandlers } from './stateHandlers.js';
import { mapTrigger, mapTriggers } from './triggers.js';

const mapLogLevel = (levelString: string): LogLevel => {
  switch (levelString) {
    case 'warn':
    case 'error':
    case 'debug':
    case 'maintainerDebug':
    case 'deepMaintainerDebug':
      return levelString;
    default:
      throw new CaseConfigurationError(
        `The log level '${levelString}' is not a valid LogLevel`,
      );
  }
};

const mapPublish = (
  publishString: string | boolean,
): false | true | 'ONLY_IN_CI' | 'NEVER' | 'ALWAYS' => {
  switch (publishString) {
    case 'ONLY_IN_CI':
      return 'ONLY_IN_CI';
    case false:
    case 'NEVER':
      return 'NEVER';
    case true:
    case 'ALWAYS':
      return 'ALWAYS';
    default:
      throw new CaseConfigurationError(
        `The publish value '${publishString}' is not a valid publish setting`,
      );
  }
};

const mapAutoVersionFrom = (autoVersionFrom: string): 'TAG' | 'GIT_SHA' => {
  switch (autoVersionFrom.toUpperCase()) {
    case 'TAG': {
      return 'TAG';
    }
    case 'GIT_SHA':
      return 'GIT_SHA';
    default:
      throw new CaseConfigurationError(
        `The autoVersionFrom setting '${autoVersionFrom}' is not a valid auto version setting`,
      );
  }
};

/**
 * SeparateConfig only exists because at one point these two things were separate.
 * At some point, we should refactor this so that the config shape doesn't need to
 * be mapped into this intermediate type.
 */
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
  autoVersionFrom,
  ...incoming
}: ContractCaseBoundaryConfig): SeparateConfig => ({
  config: {
    ...incoming,
    ...(autoVersionFrom
      ? { autoVersionFrom: mapAutoVersionFrom(autoVersionFrom) }
      : {}),
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
