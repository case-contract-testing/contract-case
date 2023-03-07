import { findAndCallTrigger } from './triggers';
import { setupExample } from './setup';

import {
  CaseConfigurationError,
  CaseFailedAssertionError,
  VerifyTriggerReturnObjectError,
} from '../../../../entities';
import {
  makeFailedExample,
  makeSuccessExample,
} from '../../../../entities/contract';
import {
  hasErrors,
  makeResults,
  executionError,
  verificationError,
  handleResult,
} from '../../../../entities/results';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseExample,
  CaseMockDescriptorFor,
  MatchContext,
} from '../../../../entities/types';
import type { WritingCaseContract } from '../../WritingCaseContract';
import type { ReadingCaseContract } from '../../ReadingCaseContract';
import type { InvokingScaffold } from '../../types';

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
      if (error instanceof CaseConfigurationError) {
        return makeFailedExample(
          example,
          makeResults(executionError(error, context))
        );
      }
      if (error instanceof CaseFailedAssertionError) {
        return makeFailedExample(example, error.matchResult);
      }

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

export const executeExample = <T extends AnyMockDescriptorType, R>(
  example: CaseExample,
  {
    stateHandlers = {},
    trigger,
    triggers,
    names,
    testErrorResponse,
    testResponse,
  }: InvokingScaffold<T, R>,
  contract: WritingCaseContract | ReadingCaseContract,
  context: MatchContext
): Promise<unknown> =>
  setupExample<T>(example, stateHandlers, context).then(
    (assertable: Assertable<T>) => {
      context.logger.debug(
        `Invoking trigger with`,
        assertable.config,
        context['case:currentRun:context:location']
      );
      return findAndCallTrigger(
        example.mock as CaseMockDescriptorFor<T>,
        { trigger, triggers, names, testErrorResponse, testResponse },
        assertable,
        context
      )
        .then(
          () => {
            context.logger.debug(`Asserting result`);
            return toResultingExample(assertable, example, context);
          },
          async (error) => {
            context.logger.debug(
              `This example failed while trying to invoke the example`
            );
            // We still need to drain the assertable

            context.logger.maintainerDebug(
              `Draining assertable and ignoring the result`
            );
            await assertable.assert().catch();

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
