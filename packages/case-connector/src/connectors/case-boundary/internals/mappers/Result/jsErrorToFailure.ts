import { BoundaryFailure } from '../../boundary/index.js';

export const jsErrorToFailure = (e: unknown): BoundaryFailure => {
  if (e instanceof Error) {
    return new BoundaryFailure(
      e.name,
      e.message,
      e.stack ?? 'unknown location',
    );
  }

  const target = { stack: '' };
  Error.captureStackTrace(target);
  return new BoundaryFailure(
    'CaseCoreError',
    `Caught something that doesn't seem to be an error: ${e}`,
    target.stack,
  );
};
