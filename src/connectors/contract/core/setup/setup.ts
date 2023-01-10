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

import { setupExecutor } from './executor';
import { SetupExecutors } from './SetupExecutors';

export const setupUnhandledAssert = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  parentMatchContext: MatchContext
): Promise<Assertable<T>> =>
  setupExecutor(interaction, SetupExecutors, parentMatchContext).then(
    ({ mock, assertableData }) => ({
      mock,
      assert: () =>
        assertableData().then(({ expected, context, actual }) =>
          context.descendAndCheck(expected, context, actual)
        ),
    })
  );

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
