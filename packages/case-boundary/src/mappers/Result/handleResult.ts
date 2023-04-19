import { CaseCoreError } from '@contract-case/case-core';
import { RESULT_FAILURE, RESULT_SUCCESS, Result } from '../../boundary';
import { failureToJsError } from './failureToJsError';
import { ErrorType } from './types';

export const handleVoidResult = (
  result: Result,
  defaultError: ErrorType
): void => {
  if (result._result === RESULT_SUCCESS) {
    return;
  }
  if (result._result === RESULT_FAILURE) {
    throw failureToJsError(result, defaultError);
  }
  throw new CaseCoreError(
    `Encountered an unexpected result type: ${result._result}`
  );
};
