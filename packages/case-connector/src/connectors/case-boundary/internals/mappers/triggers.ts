import { CaseCoreError } from '@contract-case/case-core';
import {
  RESULT_SUCCESS,
  ITriggerFunction,
  RESULT_FAILURE,
  RESULT_SUCCESS_HAS_MAP_PAYLOAD,
} from '../boundary';
import { failureToJsError } from './Result';

export const mapTrigger =
  (trigger: ITriggerFunction) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: Record<string, any>): Promise<void> =>
    trigger.trigger(config).then((result) => {
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
): Record<string, (config: Record<string, any>) => Promise<void>> =>
  Object.entries(triggers)
    .map(([key, value]) => ({ [`${key}`]: mapTrigger(value) }))
    .reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {} as Record<string, () => Promise<void>>,
    );
