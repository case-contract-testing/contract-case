import { contractFile } from 'connectors';
import type { MatchContext } from 'entities/context/types';
import type { AnyState } from 'entities/states/types';
import { hasErrors } from 'entities/results/MatchResult';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  Assertable,
  MatchResult,
} from 'entities/types';
import { handleResult } from 'entities/results';

import { setupExecutor } from './executor';
import { SetupExecutors } from './SetupExecutors';

export const setupWithContext = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  contextPromise: Promise<MatchContext>
): Promise<Assertable<T>> =>
  contextPromise.then((context) =>
    setupExecutor(interaction, SetupExecutors, context).then(
      (assertable: Assertable<T>) => ({
        ...assertable,
        assert: () =>
          assertable.assert().then((result: MatchResult) => {
            context.logger.warn('NOT YET IMPLEMENTED: Index of interaction');
            if (hasErrors(result)) {
              handleResult(
                contractFile.recordFailure(
                  interaction,
                  states,
                  context.logger,
                  result
                ),
                0,
                result,
                context
              );
            } else {
              handleResult(
                contractFile.recordSuccess(interaction, states, context.logger),
                0,
                result,
                context
              );
            }
            return result;
          }),
      })
    )
  );
