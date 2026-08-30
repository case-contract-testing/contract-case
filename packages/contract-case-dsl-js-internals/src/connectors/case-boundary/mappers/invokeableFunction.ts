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

type InvokeableFunction =
  | ((...args: unknown[]) => unknown)
  | ((...args: unknown[]) => Promise<unknown>);

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object';

/**
 * The standard Error properties that are not part of the error payload.
 * These are excluded from the payload so that only user-defined properties
 * of the thrown error are serialised (mirrors the Java wrapper, which strips
 * the standard Throwable properties).
 */
const STANDARD_ERROR_PROPERTIES = ['name', 'message', 'stack', 'cause'];

/**
 * Serialises the user-defined content of a thrown error. This is the error's
 * own enumerable properties, excluding the standard Error properties.
 */
const errorPayload = (error: unknown): unknown => {
  if (!isObject(error)) {
    return error;
  }
  return Object.fromEntries(
    Object.entries(error).filter(
      ([key]) => !STANDARD_ERROR_PROPERTIES.includes(key),
    ),
  );
};

const errorClassName = (error: unknown): string => {
  if (isObject(error) && typeof error.constructor?.name === 'string') {
    return error.constructor.name;
  }
  return typeof error;
};

const errorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  return error == null ? undefined : String(error);
};

/**
 * Maps an error thrown by a user-provided function into the function failure
 * result expected by the core's FunctionResultMatcher.
 */
const mapThrownError = (error: unknown): string =>
  JSON.stringify({
    errorClassName: errorClassName(error),
    message: errorMessage(error),
    stack: error instanceof Error ? error.stack : undefined,
    payload: errorPayload(error),
  });

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
