import { SetupFunctions, contractFile } from 'connectors';
import type { MatchContext } from 'entities/context/types';
import type { AnyState } from 'entities/states/types';
import { hasErrors } from 'entities/results/MatchResult';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  Verifiable,
  MatchResult,
} from 'entities/types';
import { setupCore } from './executor';

export const setupWithContext = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  contextPromise: Promise<MatchContext>
): Promise<Verifiable<T>> =>
  contextPromise.then((context) =>
    setupCore(interaction, SetupFunctions, context).then(
      (verifiable: Verifiable<T>) => ({
        ...verifiable,
        verify: () =>
          verifiable.verify().then((result: MatchResult) => {
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
