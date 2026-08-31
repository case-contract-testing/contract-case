import {
  BoundaryInvokableFunction,
  BoundaryResult,
  BoundarySuccessWithAny,
} from '@contract-case/case-connector/cjs';
import {
  ContractCaseConfigurationError,
  ContractCaseCoreError,
} from '../../../entities/index.js';
import { makeBoundaryFailure } from './jsErrorToBoundary.js';
import { mapThrownError } from './thrownError.js';

type InvokeableFunction =
  | ((...args: unknown[]) => unknown)
  | ((...args: unknown[]) => Promise<unknown>);

export const mapInvokeableFunction =
  (invokeableFn: InvokeableFunction): BoundaryInvokableFunction =>
  (...args: string[]): Promise<BoundaryResult> =>
    Promise.resolve()
      .then(() => args.map((arg) => JSON.parse(arg)))
      .then((parsedArgs) =>
        Promise.resolve()
          .then(() => invokeableFn(...parsedArgs))
          .then(
            (result) =>
              // Map void / undefined returns to null, as this is the boundary expectation
              JSON.stringify({
                success: JSON.stringify(result != null ? result : null),
              }),
            (e) => {
              if (
                e instanceof ContractCaseConfigurationError ||
                e instanceof ContractCaseCoreError
              ) {
                // ContractCase's own errors are not function results
                throw e;
              }
              return mapThrownError(e);
            },
          ),
      )
      .then(
        (result) => new BoundarySuccessWithAny(result),
        (e) => makeBoundaryFailure(e),
      );
