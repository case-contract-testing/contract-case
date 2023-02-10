import type { MatchContext } from 'entities/context/types';
import {
  makeFailedExample,
  makeSuccessExample,
  nameExample,
} from 'entities/contract/interactions';
import type { CaseExample } from 'entities/contract/types';
import { setupUnhandledAssert } from 'connectors/contract/core/executeExample/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateFunctions } from 'entities/states/types';
import { executionError, hasErrors, makeResults } from 'entities/results';
import type { CaseContract, CaseVerifier } from 'connectors/contract';
import type {
  AnyInteractionType,
  Assertable,
  CaseInteractionFor,
} from 'entities/types';

import { CaseConfigurationError } from 'entities';
import { executeStateHandlers, executeTeardownHandlers } from './stateHandlers';

const setupExample = <T extends AnyInteractionType>(
  example: CaseExample,
  stateSetups: StateFunctions,
  context: MatchContext
): Promise<Assertable<T>> => {
  context.logger.debug(
    `Beginning setup for example "${nameExample(
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
          .finally(() =>
            executeTeardownHandlers(example, stateSetups, context)
          ),
    }));
  });
};

const toResultingExample = <T extends AnyInteractionType>(
  assertable: Assertable<T>,
  example: CaseExample,
  context: MatchContext
) =>
  assertable.assert().then(
    (matchResult) => {
      if (hasErrors(matchResult)) {
        context.logger.debug(`This example failed the assertions`);
        return makeFailedExample(example, matchResult);
      }
      context.logger.debug(`This example passed all assertions`);
      return makeSuccessExample(example);
    },
    (error) => {
      context.logger.debug(
        `This example failed while trying to run the assertion`
      );
      return makeFailedExample(
        example,
        makeResults(
          executionError(
            new CaseConfigurationError('Failed during case assertion'),
            context
          ),
          executionError(error, context)
        )
      );
    }
  );

export const executeExample = <T extends AnyInteractionType>(
  example: CaseExample,
  stateSetups: StateFunctions,
  contract: CaseContract | CaseVerifier,
  trigger: (config: Assertable<T>['config']) => Promise<unknown>,
  context: MatchContext
): Promise<unknown> =>
  setupExample<T>(example, stateSetups, context).then(
    (assertable: Assertable<T>) => {
      context.logger.debug(
        `Invoking trigger with`,
        assertable.config,
        context['case:currentRun:context:location']
      );
      return trigger(assertable.config)
        .then(
          () => {
            context.logger.debug(`Asserting result`);
            return toResultingExample(assertable, example, context);
          },
          (error) => {
            context.logger.debug(
              `This example failed while trying to invoke the example`
            );
            return makeFailedExample(
              example,
              makeResults(
                executionError(
                  new CaseConfigurationError('Failed during trigger function'),
                  context
                ),
                executionError(error, context)
              )
            );
          }
        )
        .then((resultingExample) => {
          handleResult(
            contract.recordExample(resultingExample, context),
            context['case:currentRun:context:testName'],
            context
          );
        });
    }
  );

export const executeNoTriggerExample = <T extends AnyInteractionType>(
  example: CaseExample,
  stateSetups: StateFunctions,
  contract: CaseContract | CaseVerifier,

  context: MatchContext
): Promise<unknown> =>
  executeExample<T>(
    example,
    stateSetups,
    contract,
    () => Promise.resolve(),
    context
  );
