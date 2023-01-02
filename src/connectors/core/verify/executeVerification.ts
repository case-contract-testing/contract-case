import type { MatchContext } from 'entities/context/types';
import { nameExample } from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupWithContext } from 'connectors/core/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/nodes/states/types';
import { executeSetupHandlers, executeTeardownHandlers } from './stateHandlers';

export const executeVerification =
  (
    example: CaseExample,
    exampleIndex: number,
    stateSetups: StateFunctions,
    context: MatchContext
  ): (() => Promise<void>) =>
  () => {
    context.logger.warn('NOT YET IMPLEMENTED: Verifier configuration');
    context.logger.warn(
      'NOT YET IMPLEMENTED: Log level should not be set to maintainer by default in the verification'
    );
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
        context.logger.maintainerDebug(`Calling setupWithContext`);
        return setupWithContext(
          example.states,
          example.interaction,
          Promise.resolve(context)
        );
      })
      .then((verifiable) => verifiable.verify())
      .then((result) => handleResult(example, exampleIndex, result, context))
      .finally(() =>
        executeTeardownHandlers(example.states, stateSetups, context)
      )
      .then(() => {
        context.logger.debug(`This interaction passed verification`);
      });
  };
