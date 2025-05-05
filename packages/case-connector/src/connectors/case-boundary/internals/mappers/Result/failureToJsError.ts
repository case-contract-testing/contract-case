import {
  CaseCoreError,
  CaseConfigurationError,
  ConfigurationErrorCode,
  CaseTriggerError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-core';
import { BoundaryFailure, BoundaryResult } from '../../boundary/index.js';
import { ErrorType } from './types.js';

/**
 * Makes a context suitable for passing to LogLevelContext
 * @param location - location strings
 * @returns
 */
const makeLocation = (...locations: string[]) => ({
  '_case:currentRun:context:location': locations,
  // This is a little bit of a hack - we don't actually have the context here,
  // so we guess.
  //
  // Currently, parentVersions is never used by the Error classes, and
  // log level is only used to determine whether to render an error with the
  // the entire location in maintainerDebug. If these assumptions are ever
  // violated by the core, this will be a bug and I'm sorry about it.
  '_case:currentRun:context:parentVersions': [],
  '_case:currentRun:context:logLevel': 'error' as const,
});

const errorMessage = (message: string, location: string) =>
  `${message}\n    - at ${location}`;

const makeError = (
  kind: ErrorType,
  message: string,
  location: string,
  errorCode: ConfigurationErrorCode,
  userFacingStackTrace: string,
) => {
  switch (kind) {
    case 'CaseCoreError':
      return new CaseCoreError(
        message,
        makeLocation(location),
        userFacingStackTrace,
      );
    case 'CaseTriggerError':
      return new CaseTriggerError(
        message,
        makeLocation(),
        userFacingStackTrace,
      );
    case 'CaseConfigurationError':
      return new CaseConfigurationError(
        message,
        makeLocation(location),
        errorCode,
        userFacingStackTrace,
      );
    case 'VerifyTriggerReturnObjectError':
      return new VerifyTriggerReturnObjectError(message, userFacingStackTrace);
    default:
      return new CaseCoreError(
        `Unknown message kind '${kind}': Need to update makeError\nOriginal message: ${message}`,
      );
  }
};

export const failureToJsError = (
  result: BoundaryResult,
  defaultError: ErrorType = 'CaseConfigurationError',
): Error => {
  if (result instanceof BoundaryFailure) {
    switch (result.kind) {
      case 'CaseCoreError':
      case 'CaseTriggerError':
      case 'CaseConfigurationError':
      case 'VerifyTriggerReturnObjectError':
        return makeError(
          result.kind,
          result.message,
          result.location,
          result.contractCaseErrorCode as ConfigurationErrorCode,
          result.userFacingStackTrace,
        );
      default:
        return makeError(
          defaultError,
          errorMessage(`[${result.kind}]: ${result.message}`, result.location),
          result.location,
          result.contractCaseErrorCode as ConfigurationErrorCode,
          result.userFacingStackTrace,
        );
    }
  }
  return new CaseCoreError(
    `Encountered a failure that wasn't structured as expected. It was:\n\n${JSON.stringify(
      result,
      null,
      2,
    )}`,
  );
};
