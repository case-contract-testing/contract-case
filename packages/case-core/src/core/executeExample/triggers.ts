import {
  AnyMockDescriptor,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  VerifyTriggerReturnObjectError,
  CaseTriggerError,
  CaseConfigurationError,
  CaseCoreError,
  makeResults,
  failedExpectationError,
} from '@contract-case/case-plugin-base';
import { CaseMockDescriptorFor } from '@contract-case/case-plugin-dsl-types';
import type { InvokingScaffold, Trigger } from './types';
import { Assertable } from '../../entities/types';
import { CaseFailedAssertionError } from '../../entities';

const invokeTrigger = <T extends AnyMockDescriptorType, R>(
  trigger: Trigger<T, R>,
  testResponse: (data: R, config: Assertable<T>['config']) => unknown,
  config: Assertable<T>['config'],
  context: MatchContext,
) =>
  trigger(config).then(
    (response) => {
      try {
        return testResponse(response, config);
      } catch (e) {
        throw new VerifyTriggerReturnObjectError(e);
      }
    },
    (e) => {
      if (
        e instanceof CaseTriggerError ||
        e instanceof CaseConfigurationError ||
        e instanceof CaseCoreError ||
        e instanceof VerifyTriggerReturnObjectError
      ) {
        context.logger.maintainerDebug(
          `Trigger function received a case error (${e.name}): ${e.message}`,
        );
        throw e;
      }
      context.logger.maintainerDebug(
        `Trigger function received a non-case error (${e.name}): ${e.message}`,
      );
      throw new CaseTriggerError(e.message, context, e.userFacingStackTrace);
    },
  );

const invokeFailingTrigger = <T extends AnyMockDescriptorType, R>(
  trigger: Trigger<T, R>,
  testErrorResponse: (error: Error, config: Assertable<T>['config']) => unknown,
  config: Assertable<T>['config'],
  context: MatchContext,
) =>
  trigger(config).then(
    (data) => {
      throw new CaseFailedAssertionError(
        `Expected the provided trigger to throw an error, but instead it was ${data}'`,
        makeResults(
          failedExpectationError(
            `Expected the provided trigger to throw an error, but instead it was ${data}'`,
            data,
            'TriggerWasMeantToFail',
            context,
            'A rejecting Promise object',
          ),
        ),
      );
    },
    (actualError) =>
      Promise.resolve()
        .then(() => testErrorResponse(actualError, config))
        .catch((err) => {
          throw new VerifyTriggerReturnObjectError(err);
        }),
  );

export const findAndCallTrigger = <T extends AnyMockDescriptorType, R>(
  mock: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  {
    trigger,
    triggerAndTest,
    triggerAndTests,
    triggers,
    names,
    testErrorResponse,
    testResponse,
  }: InvokingScaffold<T, R>,
  assertable: Assertable<T>,
  context: MatchContext,
): Promise<unknown> =>
  Promise.resolve().then(() => {
    context.logger.maintainerDebug(
      `In this mock (${mock['_case:mock:type']}), in '${
        context['_case:currentRun:context:contractMode']
      }' mode, the triggers must be ${
        mock['_case:run:context:setup'][
          context['_case:currentRun:context:contractMode']
        ].triggers
      }`,
    );
    if (
      mock['_case:run:context:setup'][
        context['_case:currentRun:context:contractMode']
      ].triggers === 'generated'
    ) {
      context.logger.maintainerDebug(
        "Triggers don't need to be provided for this mock type; skipping",
      );
      return Promise.resolve();
    }
    context.logger.maintainerDebug('The provided triggers at this point are', {
      trigger,
      triggerAndTest,
      triggerAndTests,
      triggers,
      names,
      testErrorResponse,
      testResponse,
    });
    if (triggerAndTest !== undefined) {
      context.logger.debug(
        `Invoking provided trigger / test for '${names.requestName}'`,
      );
      return invokeTrigger(
        triggerAndTest as Trigger<T>,
        () => {},
        assertable.config,
        context,
      );
    }
    if (trigger !== undefined) {
      if (testErrorResponse === undefined && testResponse === undefined) {
        throw new CaseCoreError(
          'callTrigger received a trigger, but with no testErrorResponse or testResponse supplied\n.This is supposed to be prevented by DefineCaseContract',
        );
      }
      if (testResponse !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and testing a successful response`,
        );
        return invokeTrigger(trigger, testResponse, assertable.config, context);
      }
      if (testErrorResponse !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and testing a response that is expected to fail`,
        );
        return invokeFailingTrigger(
          trigger,
          testErrorResponse,
          assertable.config,
          context,
        );
      }
    }
    if (triggerAndTests !== undefined) {
      const triggerName = `${names.requestName}::${names.responseName}`;
      const fun = triggerAndTests[triggerName];
      context.logger.deepMaintainerDebug(
        `Trigger ${fun ? 'exists' : 'undefined'} for '${triggerName}'`,
      );
      if (fun !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and verification for a successful '${names.responseName}'`,
        );
        context.logger.maintainerDebug(`Trigger is from triggersAndTests`);
        return invokeTrigger(
          fun as Trigger<T>,
          () => {},
          assertable.config,
          context,
        );
      }
    }
    if (triggers !== undefined && Object.keys(triggers).length > 0) {
      const req = triggers[names.requestName];
      if (req !== undefined) {
        context.logger.maintainerDebug(
          'Was provided the request trigger; now finding the result trigger',
        );
        const res = req.testResponses?.[names.responseName];
        if (res !== undefined) {
          context.logger.debug(
            `Invoking provided trigger for '${names.requestName}', and verification for a successful '${names.responseName}'`,
          );
          return invokeTrigger(req.trigger, res, assertable.config, context);
        }
        const errRes = req.testErrorResponses?.[names.responseName];
        if (errRes !== undefined) {
          context.logger.debug(
            `Invoking provided trigger for '${names.requestName}', and verification for an error '${names.responseName}'`,
          );
          return invokeFailingTrigger(
            req.trigger,
            errRes,
            assertable.config,
            context,
          );
        }
        context.logger.error(
          `No verifier or errorVerifier for '${names.responseName}' provided`,
        );
        throw new CaseConfigurationError(
          `No verifier or errorVerifier provided for response:\n     ${names.responseName}`,
          context,
        );
      }

      context.logger.error(
        `No trigger for request '${names.requestName}' provided`,
      );
      throw new CaseConfigurationError(
        `No trigger provided for request:\n     ${names.requestName}`,
        context,
        'MISSING_TRIGGER_FUNCTION',
      );
    }
    if (triggerAndTests !== undefined) {
      // We've failed to find the right trigger, and want to return
      // helpful information about which triggers might be available
      const allFunctions = Object.keys(triggerAndTests);
      const startsWith = allFunctions.filter((s) =>
        s.startsWith(`${names.requestName}::`),
      );
      if (startsWith.length > 0) {
        // We have the request, but we don't have this response
        throw new CaseConfigurationError(
          `The trigger configuration for\n     ${names.requestName}\n   is missing a test for\n     ${names.responseName}\n   However, the following response tests exist:\n${startsWith
            .map((s) => `        ${s.split('::')[1]}`)
            .join(
              '\n',
            )}\n\nPlease check that you have configured the appropriate testResponse / testErrorResponse functions\n`,
          context,
          'MISSING_TEST_FUNCTION',
        );
      }

      const endsWith = allFunctions.filter((s) =>
        s.endsWith(`::${names.responseName}`),
      );

      if (endsWith.length > 0) {
        // We have the response test, but we don't have the trigger
        throw new CaseConfigurationError(
          `Missing a trigger pair for request:\n     ${
            names.requestName
          }\n with a response test for response:\n     ${
            names.responseName
          }\n However, tests for that response name do exist in the following configurations:\n${endsWith
            .map((s) => `        ${s.split('::')[0]}`)
            .join(
              '\n',
            )}\n\nPlease check that you have configured the appropriate trigger function\n`,
          context,
          'MISSING_TRIGGER_FUNCTION',
        );
      }

      throw new CaseConfigurationError(
        `Missing a trigger for:\n       ${names.requestName}\n  this should be paired with a test for:\n       ${names.responseName}`,
        context,
        'MISSING_TRIGGER_FUNCTION',
      );
    }
    throw new CaseConfigurationError(
      `No trigger or trigger map provided for:\n     ${names.requestName}\n  You must set a trigger or a trigger map`,
      context,
      'MISSING_TRIGGER_FUNCTION',
    );
  });
