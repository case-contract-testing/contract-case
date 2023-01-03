import type { MatchContext } from 'entities/context/types';
import { nameExample } from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupVerify } from 'connectors/contract/core/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/states/types';
import { executeSetupHandlers, executeTeardownHandlers } from './stateHandlers';

export const executeVerification =
  (
    example: CaseExample,
    exampleIndex: number,
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
    return executeSetupHandlers(example.states, stateSetups, context)
      .then(() => {
        context.logger.maintainerDebug(`Calling setupVerify`);
        return setupVerify(example.interaction, context);
      })
      .then((verifiable) => verifiable.assert())
      .then((result) => handleResult(example, exampleIndex, result, context))
      .finally(() =>
        executeTeardownHandlers(example.states, stateSetups, context)
      )
      .then(() => {
        context.logger.debug(`This interaction passed verification`);
      });
  };
