import { contractFile, SetupFunctions } from 'connectors';
import { traversals } from 'diffmatch';
import { setupCore } from 'connectors/core';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { MatchResult, Verifiable } from 'entities/types';
import type { RunContext } from 'entities/context/types';
import { makeLogger } from 'connectors/logger';
import { hasErrors } from 'entities/results/MatchResult';
import { contractFns } from 'connectors/contract';
import type { AnyState } from 'entities/nodes/states/types';

export const setup = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  runConfig: Partial<RunContext> = {}
): Promise<Verifiable<T>> =>
  Promise.resolve(
    applyDefaultContext(
      interaction,
      traversals,
      makeLogger,
      contractFns,
      runConfig
    )
  ).then((context) =>
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
