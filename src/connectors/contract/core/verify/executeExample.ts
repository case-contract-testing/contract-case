import type { MatchContext } from 'entities/context/types';
import { nameExample } from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupUnhandledAssert } from 'connectors/contract/core/verify/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/states/types';
import { executionError, hasErrors, makeResults } from 'entities/results';
import type { CaseContract, CaseVerifier } from 'connectors/contract';
import type {
  AnyInteractionType,
  Assertable,
  CaseInteractionFor,
} from 'entities/types';

import { executeStateHandlers, executeTeardownHandlers } from './stateHandlers';

export const executeExample = <T extends AnyInteractionType>(
  example: CaseExample,
  stateSetups: StateFunctions,
  contract: CaseContract | CaseVerifier,
  context: MatchContext
): Promise<Assertable<T>> => {
  context.logger.debug(
    `Beginning execution for example "${nameExample(
      example,
      context['case:currentRun:context:testName']
    )}"`
  );
  context.logger.maintainerDebug(
    'Context is',
    JSON.stringify(context, null, 2)
  );
  return executeStateHandlers(example, stateSetups, context).then(() => {
    context.logger.maintainerDebug(`Calling setupUnhandledAssert`);
    return setupUnhandledAssert(
      example.interaction as CaseInteractionFor<T>,
      context
    ).then((assertable: Assertable<T>) => ({
      ...assertable,
      assert: () =>
        assertable
          .assert()
          .finally(() => executeTeardownHandlers(example, stateSetups, context))
          .then(
            (result) => {
              if (hasErrors(result)) {
                handleResult(
                  contract.recordFailure(example, context, result),
                  context['case:currentRun:context:testName'],
                  result,
                  context
                );
              } else {
                handleResult(
                  contract.recordSuccess(example, context),
                  context['case:currentRun:context:testName'],
                  result,
                  context
                );
              }
              context.logger.debug(`This example passed`);
              return result;
            },
            (error) => {
              const results = makeResults(executionError(error, context));
              handleResult(
                contract.recordFailure(example, context, results),
                context['case:currentRun:context:testName'],
                results,
                context
              );
              context.logger.debug(`This example failed`);
              throw error;
            }
          ),
    }));
  });
};
