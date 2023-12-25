import { BoundaryResult } from '@contract-case/case-boundary';
import { ConnectorError } from '../../../domain/errors';

const promises: Record<
  string,
  { r: (value: BoundaryResult) => void; p: Promise<BoundaryResult> } | undefined
> = {};

/**
 * Make an identifier that can be used to get a promise that can be waited on
 * @internal
 *
 * @param executeCall - the call to execute immediately. Should be a function that takes an ID that is made in the call.
 * @returns an ID that can be used in a call of `waitForResolution` to get a promise
 */
export const makeResolvableId = (
  executeCall: (id: string) => Promise<void>,
): string => {
  const id = 'someID'; // TODO: Make this a uuid

  let r: (value: BoundaryResult) => void = () => {
    // This promise should be immediately overwritten by
    // the resolution function in `immediatePromise` directly below
    throw new ConnectorError(
      'An uninitialised promise resolver was called.',
      "This isn't supposed to be possible, as promises that don't do any read/write execute immediately",
    );
  };
  const immediatePromise = new Promise<BoundaryResult>((resolve) => {
    r = (v: BoundaryResult) => {
      promises[id] = undefined;
      resolve(v);
    };
  });

  promises[id] = { r, p: executeCall(id).then(() => immediatePromise) };
  return id;
};

/**
 * Returns a promise that you can wait on until someone calls `resolveById`
 * @internal
 *
 * @param id - an ID returned from `makeResolvableId`
 * @returns a promise that can be awaited
 */
export const waitForResolution = (id: string): Promise<BoundaryResult> => {
  const resolvable = promises[id];
  if (resolvable === undefined) {
    return Promise.reject(
      new ConnectorError(
        `When waiting, the promise resolver for a promise with ID '${id}' was missing.`,
        'This is a programmer error in case-connector.',
      ),
    );
  }
  return resolvable.p;
};

/**
 * Resolve the promise identified by the provided ID
 * @internal
 *
 * @param id - an ID returned from `makeResolvableId`
 */
export const resolveById = (id: string, result: BoundaryResult): void => {
  const resolvable = promises[id];
  if (resolvable === undefined) {
    throw new ConnectorError(
      `When resolving, the promise resolver for a promise with ID '${id}' was missing.`,
      'This can happen if a wrapper library misbehaves and responds to the same message more than once',
    );
  }
  resolvable.r(result);
};
