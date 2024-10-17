import { CaseCoreError, BaseSetupInfo } from '@contract-case/case-core';
import {
  RESULT_SUCCESS,
  ITriggerFunction,
  RESULT_FAILURE,
  RESULT_SUCCESS_HAS_MAP_PAYLOAD,
  BoundarySetupInfo,
  BoundarySuccessWithAny,
} from '../boundary/index.js';
import { failureToJsError, jsErrorToFailure } from './Result/index.js';

const mapSetupInfo = ({
  stateVariables,
  functions,
  mock,
}: BaseSetupInfo): BoundarySetupInfo => ({
  stateVariables,
  mock,
  functions: Object.entries(functions)
    .map(
      ([name, fn]) =>
        [
          name,
          (...args: string[]) => {
            try {
              return new BoundarySuccessWithAny(fn(...args));
            } catch (e) {
              return jsErrorToFailure(e);
            }
          },
        ] as const,
    )
    .reduce((acc, [name, fn]) => ({ ...acc, [name]: fn }), {}),
});

export const mapTrigger =
  (trigger: ITriggerFunction) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: BaseSetupInfo): Promise<void> =>
    trigger.trigger(mapSetupInfo(config)).then((result) => {
      switch (result.resultType) {
        case RESULT_SUCCESS:
        case RESULT_SUCCESS_HAS_MAP_PAYLOAD:
          return;
        case RESULT_FAILURE:
          throw failureToJsError(result);
        default:
          throw new CaseCoreError(
            `Unknown result type '${result.resultType}' during trigger handler`,
          );
      }
    });

export const mapTriggers = (
  triggers: Record<string, ITriggerFunction>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, (config: BaseSetupInfo) => Promise<void>> =>
  Object.entries(triggers)
    .map(([key, value]) => ({ [`${key}`]: mapTrigger(value) }))
    .reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {} as Record<string, () => Promise<void>>,
    );
