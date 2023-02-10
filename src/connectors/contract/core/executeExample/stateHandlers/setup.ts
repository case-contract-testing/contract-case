import { CaseConfigurationError } from 'entities';
import { addLocation } from 'entities/context';
import {
  type StateFunctions,
  type AnyState,
  isSetupFunction,
  SETUP_VARIABLE_STATE,
} from 'entities/states/types';
import type {
  MatchContext,
  AnyCaseNodeOrData,
  CaseExample,
} from 'entities/types';
import { validateVariables } from './variables';

const stateSetupHandler =
  (
    stateSetups: StateFunctions,
    context: MatchContext
  ): ((state: AnyState) => Promise<void | Record<string, AnyCaseNodeOrData>>) =>
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
          `State setup '${state.stateName}' failed with the following error: "${e.message}"`,
          e
        );
        context.logger.error(
          `Please check the implementation of the '${state.stateName}' state setup handler`
        );
        throw new CaseConfigurationError(
          `State setup '${state.stateName}' failed with the following error: "${e.message}". Please check the implementation of your state setup handler`
        );
      });
  };

type StateSetupResult = {
  stateName: string;
  variables: Record<string, AnyCaseNodeOrData>;
};

export const executeStateHandlers = (
  example: CaseExample,
  stateSetups: StateFunctions,
  parentContext: MatchContext
): Promise<void> =>
  Promise.resolve(addLocation(`:stateSetup`, parentContext)).then((context) => {
    const variableSource =
      example.interaction['case:run:context:setup'][
        context['case:currentRun:context:contractMode']
      ].stateVariables;
    context.logger.maintainerDebug(
      `Executing state setup handlers in '${context['case:currentRun:context:contractMode']}' mode: Variables obtained from ${variableSource}`
    );
    if (variableSource === 'default') {
      example.states.forEach((state) => {
        context.logger.debug(
          `Setting up state '${state.stateName}' with default values`
        );
        if (state['case:state:type'] === SETUP_VARIABLE_STATE) {
          Object.entries(state.variables).forEach(([key, value]) =>
            context.addDefaultVariable(key, state.stateName, value)
          );
        }
      });
      return Promise.resolve();
    }
    return Promise.resolve()
      .then(async () => {
        const result: StateSetupResult[] = [];
        // Usually the following code is a mistake,
        // but here we want to execute each handler in order
        // So we turn off the usual lint rules on purpose.
        // eslint-disable-next-line no-restricted-syntax
        for (const state of example.states) {
          context.logger.debug(
            `Setting up state '${state.stateName}' with the provided handler`
          );
          const stateContext = addLocation(`[${state.stateName}]`, context);
          // eslint-disable-next-line no-await-in-loop
          const variables = await validateVariables(
            state,
            stateContext,
            stateSetupHandler(stateSetups, stateContext)
          );

          result.push({
            stateName: state.stateName,
            variables: variables || {},
          });
        }
        return result;
      })
      .then((stateSetupResults) => {
        stateSetupResults.forEach((state) =>
          Object.entries(state.variables).forEach(([key, value]) =>
            context.addStateVariable(key, state.stateName, value)
          )
        );
      })
      .catch((e) => {
        context.logger.error(
          `Failed to execute state setup before test, not running test. See the logs above for more information`
        );
        throw new CaseConfigurationError(`State setup errored: ${e.message}`);
      });
  });
