import { CaseCoreError, AnyCaseMatcherOrData } from '@contract-case/case-core';
import {
  RESULT_SUCCESS,
  RESULT_FAILURE,
  RESULT_SUCCESS_HAS_MAP_PAYLOAD,
  BoundarySuccessWithMap,
  BoundaryStateHandler,
} from '../boundary/index.js';
import { failureToJsError } from './Result/index.js';

const wrapSetup =
  (boundaryHandler: BoundaryStateHandler) =>
  (): Promise<void | Record<string, AnyCaseMatcherOrData>> =>
    boundaryHandler.setup().then((result) => {
      switch (result.resultType) {
        case RESULT_SUCCESS:
          return;
        case RESULT_FAILURE:
          throw failureToJsError(result);
        case RESULT_SUCCESS_HAS_MAP_PAYLOAD:
          if (result instanceof BoundarySuccessWithMap) {
            // eslint-disable-next-line consistent-return
            return result.payload as Record<string, AnyCaseMatcherOrData>;
          }
          throw new CaseCoreError(
            `Encountered a success-with-map that wasn't. It was:  ${JSON.stringify(
              result,
              null,
              2,
            )}`,
          );
        default:
          throw new CaseCoreError(
            `Unknown result type '${result.resultType}' during setup handler`,
          );
      }
    });

const mapHandlerClass = (
  boundaryHandler: BoundaryStateHandler,
): StateHandlerFunction => ({
  setup: wrapSetup(boundaryHandler),
  teardown: () =>
    boundaryHandler.teardown().then((result) => {
      switch (result.resultType) {
        case RESULT_SUCCESS:
          return;
        case RESULT_FAILURE:
          failureToJsError(result);
          break;
        case RESULT_SUCCESS_HAS_MAP_PAYLOAD:
          throw new CaseCoreError(
            `Teardown function is not supposed to return SuccessWithMap`,
          );
        default:
          throw new CaseCoreError(
            `Unknown result type '${result.resultType}' during setup handler`,
          );
      }
    }),
});

type StateHandlerFunction =
  | (() => Promise<void | Record<string, AnyCaseMatcherOrData>>)
  | {
      setup: () => Promise<void | Record<string, AnyCaseMatcherOrData>>;
      teardown: () => Promise<void>;
    };

export const mapStateHandlers = (
  boundaryHandlers: Record<string, BoundaryStateHandler>,
): Record<string, StateHandlerFunction> =>
  Object.entries(boundaryHandlers)
    .map(([key, boundaryHandler]) => ({
      key,
      value: mapHandlerClass(boundaryHandler),
    }))
    .reduce(
      (acc, { key, value }) => ({ ...acc, [`${key}`]: value }),
      {} as Record<string, StateHandlerFunction>,
    );
