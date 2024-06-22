import {
  CaseCoreError,
  CaseConfigurationError,
  CaseTriggerError,
  VerifyTriggerReturnObjectError,
} from '@contract-case/case-core';
import { BoundaryFailure, BoundaryResult } from '../../boundary/index.js';
import { ErrorType } from './types.js';

const errorMessage = (message: string, location: string) =>
  `${message}\n    - at ${location}`;

const makeError = (kind: ErrorType, message: string, location: string) => {
  switch (kind) {
    case 'CaseCoreError':
      return new CaseCoreError(message, {
        '_case:currentRun:context:location': [location],
      });
    case 'CaseTriggerError':
      return new CaseTriggerError(message, {
        '_case:currentRun:context:location': [location],
      });
    case 'CaseConfigurationError':
      return new CaseConfigurationError(message, {
        '_case:currentRun:context:location': [location],
      });
    case 'VerifyTriggerReturnObjectError':
      return new VerifyTriggerReturnObjectError(message);
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
        return makeError(result.kind, result.message, result.location);
      default:
        return makeError(
          defaultError,
          errorMessage(`[${result.kind}]: ${result.message}`, result.location),
          result.location,
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
