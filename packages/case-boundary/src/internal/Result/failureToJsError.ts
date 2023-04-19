import {
  CaseCoreError,
  CaseConfigurationError,
} from '@contract-case/case-core';
import { Failure, Result } from '../../boundary';

const errorMessage = (message: string, location: string) =>
  `${message}\n    - at ${location}`;

export const failureToJsError = (result: Result): Error => {
  if (result instanceof Failure) {
    switch (result.kind) {
      case 'CaseCoreError':
        return new CaseCoreError(result.message);
      default:
        return new CaseConfigurationError(
          errorMessage(`[${result.kind}]: ${result.message}`, result.location)
        );
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
