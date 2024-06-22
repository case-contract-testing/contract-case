import { v4 as uuidv4 } from 'uuid';
import { BoundaryResult } from '../../../entities/types.js';
import { ConnectorError } from '../../../domain/errors/index.js';

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
  thenRun: (result: BoundaryResult) => BoundaryResult = (x) => x,
): string => {
  // TODO: Add mutex here?
  const id = uuidv4();

  let r: (value: BoundaryResult) => void = () => {
    // This promise should be immediately overwritten by
    // the resolution function in `immediatePromise` directly below
    throw new ConnectorError(
      'An uninitialised promise resolver was called.',
      "This isn't supposed to be possible, as promises that don't do any read/write execute immediately",
    );
  };

  if (promises[id] !== undefined) {
    throw new ConnectorError(
      `There is already a promise with id '${id}'. This shouldn't happen unless there are UUID collisions.\nTry re-running your tests, and report a bug if this doesn't fix it.`,
    );
  }
  const immediatePromise = new Promise<BoundaryResult>((resolve) => {
    r = (v: BoundaryResult) => {
      promises[id] = undefined;
      resolve(v);
    };
  });

  promises[id] = {
    r,
    p: executeCall(id)
      .then(() => immediatePromise)
      .then(thenRun),
  };
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
  return resolvable.r(result);
};
