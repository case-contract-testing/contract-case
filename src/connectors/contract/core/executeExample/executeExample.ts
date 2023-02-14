import type { MatchContext } from 'entities/context/types';
import {
  makeFailedExample,
  makeSuccessExample,
  exampleToNames,
} from 'entities/contract';
import type { CaseExample } from 'entities/contract/types';
import { setupUnhandledAssert } from 'connectors/contract/core/executeExample/setup';
import { handleResult } from 'entities/results/handlers';
import type { StateHandlers } from 'entities/states/types';
import { executionError, hasErrors, makeResults } from 'entities/results';
import type { CaseContract, CaseVerifier } from 'connectors/contract';
import type { InvokingScaffold } from 'connectors/contract/types';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseMockDescriptorFor,
} from 'entities/types';

import { CaseConfigurationError } from 'entities';
import { executeStateHandlers, executeTeardownHandlers } from './stateHandlers';
import { callTrigger } from './triggers';

const setupExample = <T extends AnyMockDescriptorType>(
  example: CaseExample,
  stateSetups: StateHandlers,
  context: MatchContext
): Promise<Assertable<T>> => {
  const exampleName = exampleToNames(
    example,
    context['case:currentRun:context:testName']
  );

  context.logger.debug(`Beginning setup for example "${exampleName.mockName}"`);
  context.logger.maintainerDebug(
    'Context is',
    JSON.stringify(context, null, 2)
  );
  return executeStateHandlers(example, stateSetups, context).then(() => {
    context.logger.maintainerDebug(`Calling setupUnhandledAssert`);
    return setupUnhandledAssert(
      example.mock as CaseMockDescriptorFor<T>,
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

const toResultingExample = <T extends AnyMockDescriptorType>(
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

export const executeExample = <T extends AnyMockDescriptorType>(
  example: CaseExample,
  { stateHandlers = {}, trigger, triggers, names }: InvokingScaffold<T>,
  contract: CaseContract | CaseVerifier,
  context: MatchContext
): Promise<unknown> =>
  setupExample<T>(example, stateHandlers, context).then(
    (assertable: Assertable<T>) => {
      context.logger.debug(
        `Invoking trigger with`,
        assertable.config,
        context['case:currentRun:context:location']
      );
      return callTrigger<T>(
        example.mock as CaseMockDescriptorFor<T>,
        { trigger, triggers, names },
        assertable,
        context
      )
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
