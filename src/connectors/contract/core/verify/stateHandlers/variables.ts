import { CaseConfigurationError } from 'entities';
import { hasErrors } from 'entities/results';
import { type AnyState, SETUP_VARIABLE_STATE } from 'entities/states/types';
import type { MatchContext, AnyCaseNodeOrData } from 'entities/types';

export const validateVariables = async (
  state: AnyState,
  context: MatchContext,
  stateHandler: (
    state: AnyState
  ) => Promise<void | Record<string, AnyCaseNodeOrData>>
): Promise<Record<string, AnyCaseNodeOrData>> =>
  stateHandler(state).then(async (variables) => {
    if (state['case:state:type'] === SETUP_VARIABLE_STATE) {
      if (typeof variables === 'undefined') {
        throw new CaseConfigurationError(
          `The state setup for '${
            state.stateName
          }' did not recieve any variables. Did you forget to return an object in the state setup function?  (Expected an object with keys ${Object.keys(
            state.variables
          )})`
        );
      }
      // Validate state setup variables
      const missingVariables = Object.keys(state.variables).filter(
        (variableName) => variables[variableName] === undefined
      );
      if (missingVariables.length > 0) {
        const message = `The state setup for '${
          state.stateName
        }' was expected to return an object with the variables ${Object.keys(
          state.variables
        )} set, but the following were missing: ${missingVariables}`;
        context.logger.error(message);
        throw new CaseConfigurationError(message);
      }

      const extraVariables = Object.keys(variables).filter(
        (variableName) => state.variables[variableName] === undefined
      );
      if (extraVariables.length > 0) {
        const message = `The state setup for '${
          state.stateName
        }' recieved extra variables ${extraVariables} set, but it was only expecting ${Object.keys(
          state.variables
        )}. This is probably a misconfigured state handler, and might cause failures later.`;
        context.logger.warn(message);
      }

      const matchResult = await context.descendAndCheck(
        state.variables,
        context,
        variables
      );
      if (hasErrors(matchResult)) {
        context.logger.error(
          `The state setup for '${state.stateName}' returned a value that didn't match the expected matcher:`
        );

        matchResult.forEach((e) => {
          context.resultPrinter.printError(e, context);
        });
        throw new CaseConfigurationError(
          `The state setup for '${state.stateName}' did not return the expected variables`
        );
      }
      context.logger.debug(
        `The state setup for '${state.stateName}' returned the following variables`,
        variables
      );
      return variables;
    }
    if (typeof variables !== 'undefined') {
      context.logger.warn(
        `The state '${state.stateName}' was not configured to return any variables, but still recieved variables from the state handler. Remove the return statement from the state handler or correct the state definition in the consumer contract to fix this error.`
      );
    }

    context.logger.debug(
      `The state setup for '${state.stateName}' was not configured to return any variables`
    );
    return {};
  });
