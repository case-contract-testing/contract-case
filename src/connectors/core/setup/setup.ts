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
            if (hasErrors(result)) {
              contractFile.recordFailure(
                interaction,
                states,
                context.logger,
                result
              );
            } else {
              contractFile.recordSuccess(interaction, states, context.logger);
            }
            return result;
          }),
      })
    )
  );
