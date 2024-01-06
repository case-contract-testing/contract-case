import { findAndCallTrigger } from './triggers';
import { setupExample } from './setup';

import {
  CaseConfigurationError,
  CaseCoreError,
  CaseFailedAssertionError,
  StripUnsupportedError,
  VerifyTriggerReturnObjectError,
} from '../../entities';
import { makeFailedExample, makeSuccessExample } from '../../entities/contract';
import {
  hasErrors,
  makeResults,
  configurationError,
  verificationError,
  handleResult,
  triggerError,
} from '../../entities/results';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseExample,
  CaseMockDescriptorFor,
  MatchContext,
} from '../../entities/types';
import type { WritingCaseContract } from '../WritingCaseContract';
import type { ReadingCaseContract } from '../ReadingCaseContract';
import type { InvokingScaffold } from './types';
import { CaseTriggerError } from '../../entities/errors/CaseTriggerError';

const errorToFailedExample = (
  error: Error,
  example: CaseExample,
  context: MatchContext,
) => {
  if (error instanceof VerifyTriggerReturnObjectError) {
    return makeFailedExample(
      example,
      makeResults(verificationError(error, context)),
    );
  }
  if (
    error instanceof CaseConfigurationError ||
    error instanceof StripUnsupportedError
  ) {
    return makeFailedExample(
      example,
      makeResults(configurationError(error, context)),
    );
  }
  if (error instanceof CaseTriggerError) {
    return makeFailedExample(
      example,
      makeResults(triggerError(error, context)),
    );
  }
  if (error instanceof CaseFailedAssertionError) {
    return makeFailedExample(example, error.matchResult);
  }

  if (error instanceof CaseCoreError) {
    throw error;
  }

  return makeFailedExample(
    example,
    makeResults(configurationError(error, context)),
  );
};

const assertableToExample = <T extends AnyMockDescriptorType>(
  assertable: Assertable<T>,
  example: CaseExample,
  context: MatchContext,
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
        `This example failed while trying to run the assertion`,
      );

      return errorToFailedExample(error, example, context);
    },
  );

export const executeExample = <T extends AnyMockDescriptorType, R>(
  example: CaseExample,
  {
    stateHandlers = {},
    trigger,
    triggers,
    names,
    testErrorResponse,
    triggerAndTest,
    triggerAndTests,
    testResponse,
  }: InvokingScaffold<T, R>,
  contract: WritingCaseContract | ReadingCaseContract,
  context: MatchContext,
): Promise<unknown> =>
  setupExample<T>(example, stateHandlers, context)
    .then(
      (assertable: Assertable<T>) => {
        context.logger.debug(`Invoking trigger with`, assertable.config);
        return findAndCallTrigger(
          example.mock as CaseMockDescriptorFor<T>,
          {
            trigger,
            triggers,
            names,
            testErrorResponse,
            triggerAndTest,
            triggerAndTests,
            testResponse,
          },
          assertable,
          context,
        ).then(
          () => {
            context.logger.maintainerDebug(`Asserting result`);
            return assertableToExample(assertable, example, context);
          },
          async (error) => {
            context.logger.debug(
              `This example failed while trying to invoke the trigger function`,
            );
            // We still need to drain the assertable

            context.logger.maintainerDebug(
              `Draining assertable and ignoring the result`,
            );
            await assertable.assert().catch();

            const resultingExample = errorToFailedExample(
              error,
              example,
              context,
            );
            context.logger.deepMaintainerDebug(
              'The resulting failure is:',
              resultingExample,
            );
            return resultingExample;
          },
        );
      },
      (error) => {
        context.logger.deepMaintainerDebug('An error was thrown', error);
        const resultingExample = makeFailedExample(
          example,
          makeResults(configurationError(error, context)),
        );
        context.logger.deepMaintainerDebug(
          'The new resulting failure is:',
          resultingExample,
        );
        return resultingExample;
      },
    )
    .then((resultingExample) => {
      handleResult(
        contract.recordExample(resultingExample, context),
        context['_case:currentRun:context:testName'],
        context,
      );
    });
