import {
  BoundaryResult,
  BoundarySuccess,
  BoundaryFailure,
  ITriggerFunction,
  BoundarySetupInfo,
} from '@contract-case/case-connector/cjs';
import {
  Trigger,
  TestErrorResponseFunction,
  TestResponseFunction,
  InteractionSetup,
  TriggerGroups,
  ContractCaseConfigurationError,
} from '../../../../entities/index.js';
import { mapSuccessWithAny } from '../boundaryResultToJs.js';

const mapSetup = <C extends Record<string, string>>(
  setup: BoundarySetupInfo,
): InteractionSetup<C> => ({
  mock: setup.mock as C,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFunction: (name: string): ((...args: unknown[]) => Promise<any>) => {
    const fn = setup.functions[name];
    if (fn == null) {
      throw new ContractCaseConfigurationError(
        `getFunction was asked for '${name}', but it wasn't configured in this Interaction`,
        undefined,
        undefined,
        'UNDOCUMENTED',
      );
    }
    return (...args: unknown[]) =>
      Promise.resolve()
        .then(() => fn(...args.map((a) => JSON.stringify(a))))
        .then((result) => {
          const functionReturn = mapSuccessWithAny(result);
          if (
            functionReturn !== null &&
            typeof functionReturn === 'object' &&
            'success' in functionReturn
          ) {
            return JSON.parse(functionReturn.success as string);
          }
          throw new Error(
            // TODO: This is definitely not right, and we should check to see
            // if these fields exist
            `${(functionReturn as Record<string, string>)?.['errorClassName']}: ${(functionReturn as Record<string, string>)?.['message']} `,
          );
        });
  },
  getStateVariable: (name: string) => {
    const variable = setup.stateVariables[name];
    if (variable == null) {
      throw new ContractCaseConfigurationError(
        `getStateVariable was asked for '${name}', but it wasn't present in the setup`,
        undefined,
        undefined,
        'BAD_INTERACTION_DEFINITION',
      );
    }
    return variable;
  },
});

export const mapFailingTrigger =
  <R, C extends Record<string, string>>(
    trigger: Trigger<R, C>,
    testErrorFunction: TestErrorResponseFunction<C>,
  ) =>
  (setup: BoundarySetupInfo): Promise<BoundaryResult> =>
    trigger(mapSetup(setup))
      .then<BoundaryResult, BoundaryResult>(
        () => {
          // TODO correct this return type
          throw new Error('TRIGGER SHOULD HAVE RETURNED AN ERROR');
        },
        (e) =>
          Promise.resolve()
            .then(async () => {
              await testErrorFunction(e, mapSetup(setup));
            })
            .then(
              () => new BoundarySuccess(),
              (err) =>
                new BoundaryFailure(
                  err.name,
                  err.message,
                  err.stack ?? 'no-stack',
                  // TODO: Properly propagate stack traces
                  err.stack ?? 'no-stack',
                  err.contractCaseErrorCode ?? 'UNDOCUMENTED',
                ),
            ),
      )
      .catch<BoundaryResult>(
        (e) =>
          new BoundaryFailure(
            e.name,
            e.message,
            e.stack ?? 'no-stack',
            // TODO: Properly propagate stack traces
            e.stack ?? 'no-stack',
            e.contractCaseErrorCode ?? 'UNDOCUMENTED',
          ),
      );

export const mapSuccessTrigger =
  <R, C extends Record<string, string>>(
    trigger: Trigger<R, C>,
    testResponseFunction: TestResponseFunction<R, C>,
  ) =>
  (setup: BoundarySetupInfo): Promise<BoundaryResult> =>
    trigger(mapSetup(setup))
      .then<BoundaryResult, BoundaryResult>(
        async (data) => {
          // TODO correct this return type
          await testResponseFunction(data, mapSetup(setup));
          return new BoundarySuccess();
        },
        (e) => {
          // TODO correct this return type
          throw new Error(`TRIGGER FAILED: ${e.message}`);
        },
      )
      .catch<BoundaryResult>(
        (e) =>
          new BoundaryFailure(
            e.name,
            e.message,
            e.stack ?? 'no-stack',
            // TODO: Properly propagate stack traces
            e.stack ?? 'no-stack',
            e.contractCaseErrorCode ?? 'UNDOCUMENTED',
          ),
      );

export const mapTriggers = (
  triggers: TriggerGroups,
): Record<string, ITriggerFunction> =>
  Object.entries(triggers.groups)
    .map(([requestName, triggerPairings]) => [
      ...(triggerPairings.testErrorResponses
        ? Object.entries(triggerPairings.testErrorResponses)
            .map(([responseName, testErrorFunction]) => ({
              [`${requestName}::${responseName}`]: {
                trigger: mapFailingTrigger(
                  triggerPairings.trigger,
                  testErrorFunction,
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
                  testResponseFunction,
                ),
              },
            }))
            .flat()
        : []),
    ])
    .flat()
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
