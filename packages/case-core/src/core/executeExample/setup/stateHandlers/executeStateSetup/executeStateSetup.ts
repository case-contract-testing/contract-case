import {
  StateHandlers,
  isSetupFunction,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  CaseConfigurationError,
  addLocation,
  CaseExample,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  AnyState,
  SETUP_VARIABLE_STATE,
} from '@contract-case/case-plugin-dsl-types';
import { validateVariables } from './validateVariables';

const stateSetupHandler =
  (
    stateSetups: StateHandlers,
    context: MatchContext,
  ): ((
    state: AnyState,
  ) => Promise<void | Record<string, AnyCaseMatcherOrData>>) =>
  (state: AnyState) => {
    const setupState = stateSetups[state.stateName];
    if (setupState === undefined) {
      context.logger.error(
        `No state handler for '${state.stateName}' was defined`,
      );
      return Promise.reject(
        new CaseConfigurationError(
          `Missing state setup for '${state.stateName}'`,
        ),
      );
    }

    return Promise.resolve()
      .then(() => {
        context.logger.maintainerDebug(
          `Calling state setup for '${state.stateName}'`,
        );
        return isSetupFunction(setupState) ? setupState() : setupState.setup();
      })
      .catch((e) => {
        context.logger.error(
          `State setup '${state.stateName}' failed with the following error: "${e.message}"`,
          e,
        );
        context.logger.error(
          `Please check the implementation of the '${state.stateName}' state setup handler`,
        );
        throw new CaseConfigurationError(
          `State setup '${state.stateName}' failed with the following error: ${e.message}\n\nPlease check the implementation of your state setup handler`,
        );
      });
  };

type StateSetupResult = {
  stateName: string;
  variables: Record<string, AnyCaseMatcherOrData>;
};

export const executeStateSetup = (
  example: CaseExample,
  stateSetups: StateHandlers,
  parentContext: MatchContext,
): Promise<MatchContext> =>
  Promise.resolve(addLocation(`:stateSetup`, parentContext))
    .then((context) => {
      const variableSource =
        example.mock['_case:run:context:setup'][
          context['_case:currentRun:context:contractMode']
        ].stateVariables;
      context.logger.maintainerDebug(
        `Executing state setup handlers in '${context['_case:currentRun:context:contractMode']}' mode: Variables obtained from ${variableSource}`,
      );
      // We need to extract the default variables
      // always, so that they are set for this test.
      // since identical states can be defined with
      // different default variable values
      const defaultVariables = example.states
        .map((state) => {
          if (state['_case:state:type'] === SETUP_VARIABLE_STATE) {
            context.logger.debug(
              `Setting default variables from '${state.stateName}'`,
            );
            return Object.entries(state.variables).map(([key, value]) =>
              context.addDefaultVariable(key, state.stateName, value),
            );
          }
          return [];
        })
        .flat();

      if (variableSource === 'default') {
        context.logger.debug(
          `No state setup needed, returning default state variables`,
        );
        return defaultVariables;
      }
      return Promise.resolve()
        .then(async () => {
          const result: StateSetupResult[] = [];
          // Usually the following code is a mistake,
          // but here we want to execute each handler in order
          // So we turn off the usual lint rules on purpose.
          // eslint-disable-next-line no-restricted-syntax
          for (const state of example.states) {
            context.logger.maintainerDebug(
              `Setting up state '${state.stateName}' with the provided handler`,
            );
            const stateContext = addLocation(`[${state.stateName}]`, context);
            // eslint-disable-next-line no-await-in-loop
            const variables = await validateVariables(
              state,
              stateContext,
              stateSetupHandler(stateSetups, stateContext),
            );

            result.push({
              stateName: state.stateName,
              variables: variables || {},
            });
          }
          return result;
        })
        .then((stateSetupResults) =>
          stateSetupResults
            .map((state) =>
              Object.entries(state.variables).map(([key, value]) =>
                context.addStateVariable(key, state.stateName, value),
              ),
            )
            .flat(),
        )
        .catch((e) => {
          context.logger.error(
            `Failed to execute state setup before test, not running test. See the logs above for more information`,
          );
          throw e;
        });
    })
    .then((variables) => ({
      ...parentContext,
      '_case:currentRun:context:variables': variables.reduce(
        (acc, [name, value]) => ({
          ...acc,
          [name]: parentContext.descendAndStrip(
            value,
            addLocation(':contextVariables', parentContext),
          ),
        }),
        {} as Record<string, AnyCaseMatcherOrData>,
      ),
    }));
