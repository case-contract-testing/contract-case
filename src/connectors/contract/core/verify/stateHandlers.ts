import { CaseConfigurationError } from 'entities';
import type { MatchContext } from 'entities/context/types';
import {
  type StateFunctions,
  type AnyState,
  type PromiseOrRaw,
  isSetupFunction,
  SetupNamedState,
} from 'entities/states/types';

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
      return Promise.reject(
        new CaseConfigurationError(
          `Missing state setup for '${state.stateName}'`
        )
      );
    }

    return Promise.resolve()
      .then(() => {
        context.logger.debug(`Calling state setup for '${state.stateName}'`);
        return isSetupFunction(setupState) ? setupState() : setupState.setup();
      })
      .catch((e) => {
        context.logger.error(
          `State setup '${state.stateName}}' failed with: ${e.message}`,
          e
        );
        throw new CaseConfigurationError(
          `State setup '${state.stateName}}' failed: ${e.message}. Please check the implementation of your state setup handler`
        );
      });
  };

type StateSetupResult = {
  stateName: string;
  variables: Record<string, unknown>;
};

export const executeSetupHandlers = (
  states: Array<AnyState>,
  stateSetups: StateFunctions,
  context: MatchContext
): Promise<StateSetupResult[]> =>
  Promise.resolve()
    .then(async () => {
      const result: StateSetupResult[] = [];
      // Usually the following code is a mistake,
      // but here we want to execute each handler in order
      // So we turn off the usual lint rules on purpose.
      // eslint-disable-next-line no-restricted-syntax
      for (const state of states) {
        // eslint-disable-next-line no-await-in-loop
        const variables = await stateSetupHandler(stateSetups, context)(state);

        result.push({
          stateName: state.stateName,
          variables: variables || {},
        });
      }
      return result;
    })
    .catch((e) => {
      context.logger.error(
        `Failed to execute state setup before test, not running test`,
        e.message
      );
      throw new CaseConfigurationError(`State setup errored: ${e.message}`);
    });

const stateTeardownHandler = (
  stateSetups: StateFunctions,
  state: SetupNamedState,
  context: MatchContext
) =>
  Promise.resolve()
    .then(async () => {
      const stateFn = stateSetups[state.stateName];
      if (stateFn !== undefined && !isSetupFunction(stateFn)) {
        context.logger.debug(`Calling state teardown for '${state.stateName}'`);
        await stateFn.teardown();
      } else {
        context.logger.debug(
          `No state teardown exists for '${state.stateName}'`
        );
      }
    })
    .catch((e) => {
      context.logger.error(
        `Test may have passed, but state teardown for '${state.stateName}' failed with: ${e.message}`,
        e
      );
      throw new CaseConfigurationError(
        `State teardown '${state.stateName}}' failed: ${e.message}. Please check the implementation of your state teardown handler`
      );
    });

export const executeTeardownHandlers = (
  states: Array<AnyState>,
  stateSetups: StateFunctions,
  context: MatchContext
): Promise<unknown> =>
  Promise.resolve()
    .then(async () => {
      // Usually the following code is a mistake,
      // but here we want to execute each handler in order
      // So we turn off the usual lint rules on purpose.
      // eslint-disable-next-line no-restricted-syntax
      for (const state of states) {
        // eslint-disable-next-line no-await-in-loop
        await stateTeardownHandler(stateSetups, state, context);
      }
    })
    .catch((e) => {
      context.logger.error(
        `Test may have passed, but at least one state teardown failed`,
        e.message
      );
      throw new CaseConfigurationError(`State teardown errored: ${e.message}`);
    });
