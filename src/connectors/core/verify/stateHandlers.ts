import { CaseConfigurationError } from 'entities';
import type { MatchContext } from 'entities/context/types';
import {
  type StateFunctions,
  type AnyState,
  type PromiseOrRaw,
  isSetupFunction,
} from 'entities/nodes/states/types';

const stateSetupHandler =
  (
    stateSetups: StateFunctions,
    context: MatchContext
  ): ((state: AnyState) => PromiseOrRaw<void | Record<string, unknown>>) =>
  (state: AnyState) => {
    const setupState = stateSetups[state.stateName];
    if (setupState === undefined) {
      context.logger.error(
        `No state handler for '${state.stateName}' was defined`
      );
      throw new CaseConfigurationError(`Missing state '${state.stateName}'`);
    }

    context.logger.debug(`Calling state setup for '${state.stateName}'`);
    context.logger.warn('NOT YET IMPLEMENTED: Graceful state handler errors');
    // TODO Gracefully handle error
    return Promise.resolve(
      isSetupFunction(setupState) ? setupState() : setupState.setup()
    );
  };

export const executeSetupHandlers = (
  states: Array<AnyState>,
  stateSetups: StateFunctions,
  context: MatchContext
): Promise<unknown> =>
  Promise.all(
    states.map(stateSetupHandler(stateSetups, context))
    // TODO Roll these into the context
  );

export const executeTeardownHandlers = (
  states: Array<AnyState>,
  stateSetups: StateFunctions,
  context: MatchContext
): Promise<unknown> =>
  Promise.all(
    states.map((state) => {
      const stateFn = stateSetups[state.stateName];
      if (stateFn !== undefined && !isSetupFunction(stateFn)) {
        context.logger.debug(`Calling state teardown for '${state.stateName}'`);
        return Promise.resolve(stateFn.teardown());
      }

      context.logger.debug(`No state teardown exists for '${state.stateName}'`);
      return 'No teardown';
    })
  ).catch((e) => {
    context.logger.error(
      'Test may have passed, but state teardown failed',
      e.message
    );
    throw new CaseConfigurationError(`State teardown errored: ${e.message}`);
  });
