import { CaseConfigurationError } from '@contract-case/case-core';
import { maintainerLog } from '../../../../../domain/maintainerLog.js';
import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
} from '../../boundary/index.js';

/**
 * Converts a javascript error to a BoundaryFailure. This method will never throw.
 * @param e - The error to convert
 * @returns The error mapped to a BoundaryFailure
 */
export const jsErrorToFailure = (e: unknown): BoundaryFailure => {
  // NOTE: It must not be possible for this function to throw an error
  maintainerLog('Mapping error to failure:', e);
  if (e instanceof Error) {
    return new BoundaryFailure(
      BoundaryFailureKindConstants.jsNameToConstant[e.name] ||
        BoundaryFailureKindConstants.CASE_CORE_ERROR,
      e.message,
      'location' in e && typeof e.location === 'string' ? e.location : '',
      'userFacingStackTrace' in e && typeof e.userFacingStackTrace === 'string'
        ? e.userFacingStackTrace
        : '',
      (e as CaseConfigurationError).contractCaseErrorCode ?? 'UNDOCUMENTED',
    );
  }

  const target = { stack: '' };
  Error.captureStackTrace(target);
  return new BoundaryFailure(
    'CaseCoreError',
    `Caught something that doesn't seem to be an error: ${e}`,
    'case-connector',
    target.stack,
    'UNDOCUMENTED',
  );
};
