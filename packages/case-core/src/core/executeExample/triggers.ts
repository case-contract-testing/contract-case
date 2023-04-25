import {
  VerifyTriggerReturnObjectError,
  CaseConfigurationError,
  CaseCoreError,
  CaseFailedAssertionError,
} from '../../entities';
import { CaseTriggerError } from '../../entities/errors/CaseTriggerError';
import { failedExpectationError, makeResults } from '../../entities/results';
import type {
  AnyMockDescriptorType,
  Assertable,
  CaseMockDescriptorFor,
  MatchContext,
} from '../../entities/types';
import type { InvokingScaffold, Trigger } from './types';

const invokeTrigger = <T extends AnyMockDescriptorType, R>(
  trigger: Trigger<T, R>,
  testResponse: (data: R, config: Assertable<T>['config']) => unknown,
  config: Assertable<T>['config'],
  context: MatchContext
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
          `Trigger function received a case error (${e.name})`
        );
        throw e;
      }
      context.logger.maintainerDebug(
        `Trigger function received a non-case error (${e.name})`
      );
      throw new CaseTriggerError(e.message, context);
    }
  );

const invokeFailingTrigger = <T extends AnyMockDescriptorType, R>(
  trigger: Trigger<T, R>,
  testErrorResponse: (error: Error, config: Assertable<T>['config']) => unknown,
  config: Assertable<T>['config'],
  context: MatchContext
) =>
  trigger(config).then(
    (data) => {
      throw new CaseFailedAssertionError(
        makeResults(
          failedExpectationError(
            `Expected the provided trigger to throw an error, but instead it was ${data}'`,
            data,
            'TriggerWasMeantToFail',
            context,
            'A rejecting Promise object'
          )
        )
      );
    },
    (actualError) =>
      Promise.resolve()
        .then(() => testErrorResponse(actualError, config))
        .catch((err) => {
          throw new VerifyTriggerReturnObjectError(err);
        })
  );

export const findAndCallTrigger = <T extends AnyMockDescriptorType, R>(
  mock: CaseMockDescriptorFor<T>,
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
  context: MatchContext
): Promise<unknown> => {
  context.logger.maintainerDebug(
    `In this mock (${mock['_case:mock:type']}), in '${
      context['_case:currentRun:context:contractMode']
    }' mode, the triggers are ${
      mock['_case:run:context:setup'][
        context['_case:currentRun:context:contractMode']
      ].triggers
    }`
  );
  if (
    mock['_case:run:context:setup'][
      context['_case:currentRun:context:contractMode']
    ].triggers === 'generated'
  ) {
    context.logger.maintainerDebug(
      "Triggers don't exist for this mock type; skipping"
    );
    return Promise.resolve();
  }
  if (triggerAndTest !== undefined) {
    context.logger.debug(
      `Invoking provided trigger / test for '${names.requestName}'`
    );
    return invokeTrigger(triggerAndTest, () => {}, assertable.config, context);
  }
  if (trigger !== undefined) {
    if (testErrorResponse === undefined && testResponse === undefined) {
      throw new CaseCoreError(
        'callTrigger received a trigger, but with no testErrorResponse or testResponse supplied\n.This is supposed to be prevented by DefineCaseContract'
      );
    }
    if (testResponse !== undefined) {
      context.logger.debug(
        `Invoking provided trigger for '${names.requestName}', and testing a successful response`
      );
      return invokeTrigger(trigger, testResponse, assertable.config, context);
    }
    if (testErrorResponse !== undefined) {
      context.logger.debug(
        `Invoking provided trigger for '${names.requestName}', and testing a response that is expected to fail`
      );
      return invokeFailingTrigger(
        trigger,
        testErrorResponse,
        assertable.config,
        context
      );
    }
  }
  if (triggerAndTests !== undefined) {
    const fun = triggerAndTests[`${names.requestName}::${names.responseName}`];
    if (fun !== undefined) {
      context.logger.debug(
        `Invoking provided trigger for '${names.requestName}', and verification for a successful '${names.responseName}'`
      );
      context.logger.maintainerDebug(`Trigger is from triggersAndTests`);
      return invokeTrigger(fun, () => {}, assertable.config, context);
    }
  }
  if (triggers !== undefined) {
    const req = triggers[names.requestName];
    if (req !== undefined) {
      context.logger.maintainerDebug(
        'Was provided the request trigger; now finding the result trigger'
      );
      const res = req.testResponses?.[names.responseName];
      if (res !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and verification for a successful '${names.responseName}'`
        );
        return invokeTrigger(req.trigger, res, assertable.config, context);
      }
      const errRes = req.testErrorResponses?.[names.responseName];
      if (errRes !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and verification for an error '${names.responseName}'`
        );
        return invokeFailingTrigger(
          req.trigger,
          errRes,
          assertable.config,
          context
        );
      }
      context.logger.error(
        `No verifier or errorVerifier for '${names.responseName}' provided`
      );
      throw new CaseConfigurationError(
        `No verifier or errorVerifier provided for response '${names.responseName}' provided`,
        context
      );
    }
    context.logger.error(
      `No trigger for request '${names.requestName}' provided`
    );
    throw new CaseConfigurationError(
      `No trigger provided for request '${names.requestName}' provided`,
      context
    );
  }
  throw new CaseConfigurationError(
    `No trigger or trigger map provided for '${names.requestName}', but it expected at least one of these to be set`,
    context
  );
};
