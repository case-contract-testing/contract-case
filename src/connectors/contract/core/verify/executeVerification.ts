import type { MatchContext } from 'entities/context/types';
import { nameExample } from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupUnhandledAssert } from 'connectors/contract/core/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/states/types';
import { executionError, makeResults } from 'entities/results';
import {
  getContextFromStateHandlers,
  executeTeardownHandlers,
} from './stateHandlers';

export const executeVerification =
  (
    example: CaseExample,
    exampleIndex: string,
    stateSetups: StateFunctions,
    initialContext: MatchContext
  ): (() => Promise<void>) =>
  () => {
    initialContext.logger.debug(
      `Beginning verification for interaction "${nameExample(
        example,
        exampleIndex
      )}"`
    );
    initialContext.logger.maintainerDebug(
      'Context is',
      JSON.stringify(initialContext, null, 2)
    );
    return getContextFromStateHandlers(
      example.states,
      stateSetups,
      initialContext
    )
      .then((context) => {
        context.logger.maintainerDebug(`Calling setupVerify`);
        return setupUnhandledAssert(example.interaction, context)
          .then((verifiable) => verifiable.assert())
          .finally(() =>
            executeTeardownHandlers(example.states, stateSetups, context)
          );
      })
      .then(
        (result) => handleResult(example, exampleIndex, result, initialContext),
        (error) => {
          handleResult(
            example,
            exampleIndex,
            makeResults(executionError(error, initialContext)),
            initialContext
          );
          throw error;
        }
      )
      .then(() => {
        initialContext.logger.debug(`This interaction passed verification`);
      });
  };
