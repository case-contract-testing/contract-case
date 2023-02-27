import type { MatchContext } from 'entities/context/types';
import { makeFailedExample, makeSuccessExample } from 'entities/contract';
import type { CaseExample } from 'entities/contract/types';
import { handleResult } from 'entities/results/handlers';
import {
  executionError,
  hasErrors,
  makeResults,
  verificationError,
} from 'entities/results';
import type { CaseContract, CaseVerifier } from 'connectors/contract';
import type { InvokingScaffold } from 'connectors/contract/types';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseMockDescriptorFor,
} from 'entities/types';
import {
  CaseConfigurationError,
  VerifyTriggerReturnObjectError,
} from 'entities';

import { callTrigger } from './triggers';
import { setupExample } from './setup';

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
            if (error instanceof VerifyTriggerReturnObjectError) {
              return makeFailedExample(
                example,
                makeResults(verificationError(error, context))
              );
            }
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
