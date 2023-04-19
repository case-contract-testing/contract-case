import { Failure } from '../../boundary/Result';

export const handleError = (e: unknown): Failure => {
  if (e instanceof Error) {
    return new Failure(e.name, e.message, e.stack ?? 'unknown location');
  }

  const target = { stack: '' };
  Error.captureStackTrace(target);
  return new Failure(
    'CaseCoreError',
    `Caught something that doesn't seem to be an error: ${e}`,
    target.stack
  );
};
