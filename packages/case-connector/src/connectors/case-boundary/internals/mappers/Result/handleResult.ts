import { CaseCoreError } from '@contract-case/case-core';
import {
  RESULT_FAILURE,
  RESULT_SUCCESS,
  BoundaryResult,
  RESULT_SUCCESS_HAS_ANY_PAYLOAD,
  BoundarySuccessWithAny,
} from '../../boundary/index.js';
import { failureToJsError } from './failureToJsError.js';
import { ErrorType } from './types.js';
import { maintainerLog } from '../../../../../domain/maintainerLog.js';

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

export const handleSuccessAnyResult = (
  result: BoundaryResult,
  defaultError: ErrorType,
): string => {
  if (result.resultType === RESULT_SUCCESS_HAS_ANY_PAYLOAD) {
    return (result as BoundarySuccessWithAny).payload;
  }
  if (result.resultType === RESULT_FAILURE) {
    throw failureToJsError(result, defaultError);
  }
  maintainerLog('Unexpected result type on the following result:', result);
  throw new CaseCoreError(
    `Encountered an unexpected result type: ${result.resultType}`,
  );
};
