import {
  CaseCoreError,
  CaseConfigurationError,
} from '@contract-case/case-core';
import { Failure, Result } from '../../boundary';
import { ErrorType } from './types';

const errorMessage = (message: string, location: string) =>
  `${message}\n    - at ${location}`;

export const failureToJsError = (
  result: Result,
  defaultError: ErrorType = 'CaseConfigurationError'
): Error => {
  if (result instanceof Failure) {
    switch (result.kind) {
      case 'CaseCoreError':
        return new CaseCoreError(result.message);
      default: {
        const message = errorMessage(
          `[${result.kind}]: ${result.message}`,
          result.location
        );
        if (defaultError === 'CaseConfigurationError') {
          return new CaseConfigurationError(message);
        }
        return new CaseCoreError(message);
      }
    }
  }
  return new CaseCoreError(
    `Encountered a failure that wasn't. It was:  ${JSON.stringify(
      result,
      null,
      2
    )}`
  );
};
