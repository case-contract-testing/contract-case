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
      e.stack ?? 'unknown location',
      e.stack ?? 'unknown location',
    );
  }

  const target = { stack: '' };
  Error.captureStackTrace(target);
  return new BoundaryFailure(
    'CaseCoreError',
    `Caught something that doesn't seem to be an error: ${e}`,
    target.stack,
    target.stack,
  );
};
