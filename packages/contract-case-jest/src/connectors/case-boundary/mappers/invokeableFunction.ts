import {
  BoundaryInvokableFunction,
  BoundaryResult,
  BoundarySuccessWithAny,
} from '@contract-case/case-connector/cjs';
import { makeBoundaryFailure } from './jsErrorToBoundary.js';

type InvokeableFunction =
  | ((...args: unknown[]) => unknown)
  | ((...args: unknown[]) => Promise<unknown>);

export const mapInvokeableFunction =
  (invokeableFn: InvokeableFunction): BoundaryInvokableFunction =>
  (...args: string[]): Promise<BoundaryResult> =>
    Promise.resolve()
      .then(() => invokeableFn(...args.map((arg) => JSON.parse(arg))))
      .then((result) =>
        // Map void / undefined returns to null, as this is the boundary expectation
        JSON.stringify({
          success: JSON.stringify(result != null ? result : null),
        }),
      )
      .then(
        (result) => new BoundarySuccessWithAny(result),
        (e) => makeBoundaryFailure(e),
      );
