import type { MatchContext } from 'entities/context/types';
import { nameExample } from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupUnhandledAssert } from 'connectors/contract/core/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/states/types';
import { executionError, makeResults } from 'entities/results';
import { executeStateHandlers, executeTeardownHandlers } from './stateHandlers';

export const executeExample =
  (
    example: CaseExample,
    exampleIndex: string,
    stateSetups: StateFunctions,
    context: MatchContext
  ): (() => Promise<void>) =>
  () => {
    context.logger.debug(
      `Beginning verification for interaction "${nameExample(
        example,
        exampleIndex
      )}"`
    );
    context.logger.maintainerDebug(
      'Context is',
      JSON.stringify(context, null, 2)
    );
    return executeStateHandlers(example, stateSetups, context)
      .then(() => {
        context.logger.maintainerDebug(`Calling setupVerify`);
        return setupUnhandledAssert(example.interaction, context)
          .then((verifiable) => verifiable.assert())
          .finally(() =>
            executeTeardownHandlers(example, stateSetups, context)
          );
      })
      .then(
        (result) => handleResult(example, exampleIndex, result, context),
        (error) => {
          handleResult(
            example,
            exampleIndex,
            makeResults(executionError(error, context)),
            context
          );
          throw error;
        }
      )
      .then(() => {
        context.logger.debug(`This interaction passed verification`);
      });
  };
