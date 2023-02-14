import type { InvokingScaffold } from 'connectors/contract/types';
import { CaseConfigurationError } from 'entities';
import type {
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
  Assertable,
  MatchContext,
} from 'entities/types';

export const callTrigger = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<T>,
  { trigger, triggers, names }: InvokingScaffold<T>,
  assertable: Assertable<T>,
  context: MatchContext
): Promise<unknown> => {
  context.logger.maintainerDebug(
    `In this mock (${mock['case:mock:type']}), in '${
      context['case:currentRun:context:contractMode']
    }' mode, the triggers are ${
      mock['case:run:context:setup'][
        context['case:currentRun:context:contractMode']
      ].triggers
    }`
  );
  if (
    mock['case:run:context:setup'][
      context['case:currentRun:context:contractMode']
    ].triggers === 'generated'
  ) {
    context.logger.maintainerDebug(
      "Triggers don't exist for this mock type; skipping"
    );
    return Promise.resolve();
  }
  if (trigger !== undefined) {
    context.logger.debug(
      `Invoking provided trigger for '${names.requestName}'`
    );
    return trigger(assertable.config);
  }
  if (triggers !== undefined) {
    const req = triggers[names.requestName];
    if (req !== undefined) {
      context.logger.maintainerDebug(
        'Was provided the request trigger; now finding the result trigger'
      );
      const res = req.verifiers[names.responseName];
      if (res !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and verification for a successful '${names.responseName}'`
        );
        return req
          .trigger(assertable.config)
          .then((data) => res(data, assertable.config));
      }
      const errRes = req.errorVerifiers[names.responseName];
      if (errRes !== undefined) {
        context.logger.debug(
          `Invoking provided trigger for '${names.requestName}', and verification for an error '${names.responseName}'`
        );
        return req.trigger(assertable.config).then(
          (data) => {
            throw new CaseConfigurationError(
              `The trigger for '${
                names.mockName
              }' did not fail with an error. It instead returned: ${JSON.stringify(
                data
              )}`,
              context
            );
          },
          (e) => errRes(e, assertable.config)
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
