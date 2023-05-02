import { CaseCoreError } from '@contract-case/case-core';
import { RESULT_FAILURE, RESULT_SUCCESS, BoundaryResult } from '../../boundary';
import { failureToJsError } from './failureToJsError';
import { ErrorType } from './types';

export const handleVoidResult = (
  result: BoundaryResult,
  defaultError: ErrorType
): void => {
  if (result.resultType === RESULT_SUCCESS) {
    return;
  }
  if (result.resultType === RESULT_FAILURE) {
    throw failureToJsError(result, defaultError);
  }
  throw new CaseCoreError(
    `Encountered an unexpected result type: ${result.resultType}`
  );
};
