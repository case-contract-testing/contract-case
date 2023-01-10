import type { MatchContext } from 'entities/context/types';
import type { AnyState } from 'entities/states/types';
import { hasErrors } from 'entities/results/MatchResult';
import type { CaseContract } from 'connectors/contract';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  Assertable,
  MatchResult,
} from 'entities/types';
import { handleResult } from 'entities/results';
import { addLocation } from 'entities/context';
import { CaseConfigurationError } from 'entities';

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
  }));

export const setupHandledAssert = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  context: MatchContext,
  contract: CaseContract
): Promise<Assertable<T>> =>
  setupUnhandledAssert(interaction, context).then(
    (assertable: Assertable<T>) => ({
      ...assertable,
      assert: () =>
        assertable.assert().then((result: MatchResult) => {
          context.logger.warn('NOT YET IMPLEMENTED: Index of interaction');
          if (hasErrors(result)) {
            handleResult(
              contract.recordFailure(interaction, states, context, result),
              0,
              result,
              context
            );
          } else {
            handleResult(
              contract.recordSuccess(interaction, states, context),
              0,
              result,
              context
            );
          }
          return result;
        }),
    })
  );
