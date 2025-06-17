import { CaseConfigurationError } from '@contract-case/case-core';
import { maintainerLog } from '../../../../../domain/maintainerLog.js';
import {
  BoundaryFailure,
  BoundaryFailureKindConstants,
} from '../../boundary/index.js';

export const jsErrorToFailure = (e: unknown): BoundaryFailure => {
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
