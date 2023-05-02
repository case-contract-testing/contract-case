import {
  BoundaryResult,
  BoundarySuccess,
  BoundaryFailure,
  ITriggerFunction,
} from '@contract-case/case-boundary';
import {
  Trigger,
  TestErrorResponseFunction,
  TestResponseFunction,
  TriggerPair,
  TriggerConfig,
} from '../../../entities/types';

export const mapFailingTrigger =
  <R, C>(
    trigger: Trigger<R, C>,
    testErrorFunction: TestErrorResponseFunction
  ) =>
  (config: TriggerConfig<C>): Promise<BoundaryResult> =>
    trigger(config)
      .then<BoundaryResult, BoundaryResult>(
        () => {
          // TODO correct this return type
          throw new Error('TRIGGER SHOULD HAVE RETURNED AN ERROR');
        },
        (e) =>
          Promise.resolve()
            .then(async () => {
              await testErrorFunction(e, config);
            })
            .then(
              () => new BoundarySuccess(),
              (err) =>
                new BoundaryFailure(
                  err.name,
                  err.message,
                  err.stack ?? 'no-stack'
                )
            )
      )
      .catch<BoundaryResult>(
        (e) => new BoundaryFailure(e.name, e.message, e.stack ?? 'no-stack')
      );

export const mapSuccessTrigger =
  <R, C>(
    trigger: Trigger<R, C>,
    testResponseFunction: TestResponseFunction<R>
  ) =>
  (config: TriggerConfig<C>): Promise<BoundaryResult> =>
    trigger(config)
      .then<BoundaryResult, BoundaryResult>(
        async (data) => {
          // TODO correct this return type
          await testResponseFunction(data, config);
          return new BoundarySuccess();
        },
        () => {
          // TODO correct this return type
          throw new Error('TRIGGER FAILED ');
        }
      )
      .catch<BoundaryResult>(
        (e) => new BoundaryFailure(e.name, e.message, e.stack ?? 'no-stack')
      );

export const mapTriggers = (
  triggers: Record<string, TriggerPair<unknown>>
): Record<string, ITriggerFunction> =>
  Object.entries(triggers)
    .map(([requestName, triggerPairings]) => [
      ...(triggerPairings.testErrorResponses
        ? Object.entries(triggerPairings.testErrorResponses)
            .map(([responseName, testErrorFunction]) => ({
              [`${requestName}::${responseName}`]: {
                trigger: mapFailingTrigger(
                  triggerPairings.trigger,
                  testErrorFunction
                ),
              },
            }))
            .flat()
        : []),
      ...(triggerPairings.testResponses
        ? Object.entries(triggerPairings.testResponses)
            .map(([responseName, testResponseFunction]) => ({
              [`${requestName}::${responseName}`]: {
                trigger: mapSuccessTrigger(
                  triggerPairings.trigger,
                  testResponseFunction
                ),
              },
            }))
            .flat()
        : []),
    ])
    .flat()
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
