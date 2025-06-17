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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const neverCalled = (_x: never) => {};

const mapLogLevel = (maybeLevelString: string): LogLevel => {
  const levelString = maybeLevelString as LogLevel;
  switch (levelString) {
    case 'none':
    case 'warn':
    case 'error':
    case 'debug':
    case 'maintainerDebug':
    case 'deepMaintainerDebug':
      return levelString;
    default:
      // This is a check to ensure we have full coverage of the level strings
      neverCalled(levelString);
      throw new CaseConfigurationError(
        `The log level '${levelString}' is not a valid LogLevel`,
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
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
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
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
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
      );
  }
};

const mapChangedContracts = (
  changedContracts: string,
): 'FAIL' | 'OVERWRITE' => {
  switch (changedContracts.toUpperCase()) {
    case 'FAIL': {
      return 'FAIL';
    }
    case 'OVERWRITE':
      return 'OVERWRITE';
    default:
      throw new CaseConfigurationError(
        `The changedContracts setting '${changedContracts}' is not a valid changed contracts setting`,
        'DONT_ADD_LOCATION',
        'INVALID_CONFIG',
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

/**
 * Converts between the boundary config (which is less restricted) and a
 * validated form of CaseConfig.
 *
 * Here, validated means "conforms to the typescript definition of CaseConfig".
 *
 * Mappers should throw `CaseConfigurationError` if the values in the boundary config
 * can't be assigned to the CaseConfig.
 *
 * @internal
 * @param param0 - A boundary config object
 * @returns a validated case config object
 */
export const convertConfig = ({
  stateHandlers,
  triggerAndTest,
  triggerAndTests,
  logLevel,
  publish,
  autoVersionFrom,
  changedContracts,
  ...incoming
}: ContractCaseBoundaryConfig): SeparateConfig => ({
  config: {
    ...incoming,
    ...(autoVersionFrom
      ? { autoVersionFrom: mapAutoVersionFrom(autoVersionFrom) }
      : {}),
    ...(changedContracts
      ? { changedContracts: mapChangedContracts(changedContracts) }
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
