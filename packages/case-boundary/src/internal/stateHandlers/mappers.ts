import { CaseCoreError } from '@contract-case/case-core';
import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';
import {
  RESULT_SUCCESS,
  RESULT_FAILURE,
  RESULT_SUCCESS_HAS_MAP_PAYLOAD,
  SuccessWithMap,
  StateHandler,
  StateHandlerWithTeardown,
} from '../../boundary';
import { failureToJsError } from '../Result';

const wrapSetup =
  (boundaryHandler: StateHandler) =>
  (): Promise<void | Record<string, AnyCaseMatcherOrData>> =>
    boundaryHandler.setup().then((result) => {
      switch (result._result) {
        case RESULT_SUCCESS:
          return;
        case RESULT_FAILURE:
          throw failureToJsError(result);
        case RESULT_SUCCESS_HAS_MAP_PAYLOAD:
          if (result instanceof SuccessWithMap) {
            // eslint-disable-next-line consistent-return
            return result.payload as Record<string, AnyCaseMatcherOrData>;
          }
          throw new CaseCoreError(
            `Encountered a success-with-map that wasn't. It was:  ${JSON.stringify(
              result,
              null,
              2
            )}`
          );
        default:
          throw new CaseCoreError(
            `Unknown result type '${result._result}' during setup handler`
          );
      }
    });

const mapHandlerClass = (
  boundaryHandler: StateHandler | StateHandlerWithTeardown
): StateHandlerFunction => {
  if (boundaryHandler instanceof StateHandlerWithTeardown) {
    return {
      setup: wrapSetup(boundaryHandler),
      teardown: () =>
        boundaryHandler.teardown().then((result) => {
          switch (result._result) {
            case RESULT_SUCCESS:
              return;
            case RESULT_FAILURE:
              failureToJsError(result);
              break;
            case RESULT_SUCCESS_HAS_MAP_PAYLOAD:
              throw new CaseCoreError(
                `Teardown function is not supposed to return SuccessWithMap`
              );
            default:
              throw new CaseCoreError(
                `Unknown result type '${result._result}' during setup handler`
              );
          }
        }),
    };
  }
  return wrapSetup(boundaryHandler);
};

type StateHandlerFunction =
  | (() => Promise<void | Record<string, AnyCaseMatcherOrData>>)
  | {
      setup: () => Promise<void | Record<string, AnyCaseMatcherOrData>>;
      teardown: () => Promise<void>;
    };

export const mapStateHandlers = (
  boundaryHandlers: Record<string, StateHandler | StateHandlerWithTeardown>
): Record<string, StateHandlerFunction> =>
  Object.entries(boundaryHandlers)
    .map(([key, boundaryHandler]) => ({
      key,
      value: mapHandlerClass(boundaryHandler),
    }))
    .reduce(
      (acc, { key, value }) => ({ ...acc, [`${key}`]: value }),
      {} as Record<string, StateHandlerFunction>
    );
