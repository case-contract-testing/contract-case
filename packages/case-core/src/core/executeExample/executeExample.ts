import {
  AnyMockDescriptor,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  VerifyTriggerReturnObjectError,
  makeResults,
  CaseConfigurationError,
  StripUnsupportedError,
  CaseTriggerError,
  CaseCoreError,
  hasErrors,
  CaseExample,
} from '@contract-case/case-plugin-base';
import { CaseMockDescriptorFor } from '@contract-case/case-plugin-dsl-types';

import { setupExample } from './setup';
import { findAndCallTrigger } from './triggers';
import {
  verificationError,
  configurationError,
  triggerError,
  handleResult,
} from '../../entities/results';
import { InvokingScaffold } from './types';
import { Assertable } from '../../entities/types';
import type { ReadingCaseContract } from '../ReadingCaseContract';
import type { WritingCaseContract } from '../WritingCaseContract';
import {
  CaseFailedAssertionError,
  makeFailedExample,
  makeSuccessExample,
} from '../../entities';
import { getNamedVariant } from '../plugins/mockExecutors';

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
        context.logger.debug(`This interaction failed the assertions`);
        return makeFailedExample(example, matchResult);
      }
      context.logger.debug(`This interaction passed all assertions`);
      return makeSuccessExample(example);
    },
    (error) => {
      context.logger.debug(
        `This interaction failed while trying to run the assertion`,
      );

      return errorToFailedExample(error, example, context);
    },
  );

const renderStackTrace = (e: unknown) => {
  if (e != null && typeof e === 'object' && 'userFacingStackTrace' in e) {
    return e.userFacingStackTrace;
  }
  return (e as Error).stack;
};

export const executeExample = <T extends AnyMockDescriptorType, R>(
  unnamedExample: CaseExample,
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
): Promise<void> =>
  Promise.resolve()
    .then(() => ({
      ...unnamedExample,
      // Type assertion here because
      // we can't know all the mock types ahead of
      // time due to plugins loading.
      mock: getNamedVariant(unnamedExample.mock as AnyMockDescriptor, context),
    }))
    .then(async (example) => ({
      assertable: await setupExample<T>(example, stateHandlers, context),
      example,
    }))
    .then(
      ({ assertable, example }) => {
        context.logger.debug(
          `Invoking trigger with the following InteractionSetup`,
          assertable.config,
        );
        return findAndCallTrigger(
          example.mock as CaseMockDescriptorFor<AnyMockDescriptor, T>,
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
              `This interaction failed while trying to invoke the trigger function.`,
              error.message,
              `Stack trace follows.`,
              renderStackTrace(error as Error),
            );

            // We still need to drain the assertable

            context.logger.maintainerDebug(
              `Draining assertable and ignoring the result`,
            );
            await assertable.assert().catch(() => {});

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
        context.logger.maintainerDebug(
          'An error was thrown by setupExample',
          error.stack,
        );
        const resultingExample = makeFailedExample(
          unnamedExample,
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
      context.logger.maintainerDebug('Resulting example was', resultingExample);
      return handleResult(
        contract.recordExample(resultingExample, context),
        context['_case:currentRun:context:testName'],
        context,
      );
    });
