import type { MatchContext } from 'entities/context/types';
import type { AnyState } from 'entities/states/types';
import { hasErrors } from 'entities/results/MatchResult';
import type { CaseContract } from 'connectors/contract';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  Assertable,
  MatchResult,
  AnyCaseNodeType,
  AnyData,
  DataOrCaseNodeFor,
  AnyCaseNodeOrData,
} from 'entities/types';
import { handleResult } from 'entities/results';
import { addLocation, applyNodeToContext } from 'entities/context';
import { CaseConfigurationError, coreLookupMatcher } from 'entities';

import { interactionExecutor } from './interactionExecutor';
import { InteractionExecutors } from './InteractionExecutors';

export const setupUnhandledAssert = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  parentMatchContext: MatchContext
): Promise<Assertable<T>> =>
  interactionExecutor(
    interaction,
    InteractionExecutors,
    parentMatchContext
  ).then(({ mock, assertableData }) => ({
    mock,
    assert: () =>
      assertableData().then(({ expected, context, actual }) =>
        Promise.resolve(
          context.selfVerify(expected, addLocation(':selfCheck', context))
        )
          .then((selfVerification) => {
            if (hasErrors(selfVerification)) {
              throw new CaseConfigurationError(
                // TODO document this extensively.
                `The matchers used have been given an example that doesn't pass the matcher: ${selfVerification[0]?.message} (at ${selfVerification[0]?.location})`
              );
            }
          })
          .then(() => context.descendAndCheck(expected, context, actual))
      ),
    stripMatchers: <M extends AnyCaseNodeType>(
      matcherOrData: DataOrCaseNodeFor<M>
    ): AnyData =>
      parentMatchContext.descendAndStrip(
        matcherOrData,
        applyNodeToContext(matcherOrData, parentMatchContext)
      ),
  }));

const nameMatcher = (matcher: AnyCaseNodeOrData, context: MatchContext) =>
  coreLookupMatcher(context.descendAndDescribe(matcher, context), matcher);

const nameInteraction = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  context: MatchContext
): CaseInteractionFor<T> => ({
  ...interaction,
  request: nameMatcher(interaction.request, context),
  response: nameMatcher(interaction.response, context),
});

export const setupWritingAssert = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  rawInteraction: CaseInteractionFor<T>,
  context: MatchContext,
  contract: CaseContract
): Promise<Assertable<T>> =>
  Promise.resolve().then(() => {
    const interaction = nameInteraction(rawInteraction, context);
    return setupUnhandledAssert(interaction, context).then(
      (assertable: Assertable<T>) => ({
        ...assertable,
        assert: () =>
          assertable.assert().then((result: MatchResult) => {
            if (hasErrors(result)) {
              handleResult(
                contract.recordFailure(interaction, states, context, result),
                context['case:currentRun:context:testName'],
                result,
                context
              );
            } else {
              handleResult(
                contract.recordSuccess(interaction, states, context),
                context['case:currentRun:context:testName'],
                result,
                context
              );
            }
            return result;
          }),
      })
    );
  });
