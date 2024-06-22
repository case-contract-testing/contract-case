import { CaseCoreError } from '@contract-case/case-core';
import { RESULT_FAILURE, RESULT_SUCCESS, BoundaryResult } from '../../boundary/index.js';
import { failureToJsError } from './failureToJsError.js';
import { ErrorType } from './types.js';

export const handleVoidResult = (
  result: BoundaryResult,
  defaultError: ErrorType,
): void => {
  if (result.resultType === RESULT_SUCCESS) {
    return;
  }
  if (result.resultType === RESULT_FAILURE) {
    throw failureToJsError(result, defaultError);
  }
  throw new CaseCoreError(
    `Encountered an unexpected result type: ${result.resultType}`,
  );
};
