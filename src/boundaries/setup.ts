import { contractFile, SetupFunctions } from 'connectors';
import { traversals } from 'diffmatch';
import { setupCore } from 'core';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { MatchResult, Verifiable } from 'entities/types';
import type { RunContext } from 'entities/context/types';
import { makeLogger } from 'connectors/logger';
import { hasErrors } from 'entities/results/MatchResult';

export const setup = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  runConfig: Partial<RunContext> = {}
): Promise<Verifiable<T>> =>
  Promise.resolve(
    applyDefaultContext(interaction, traversals, makeLogger, runConfig)
  ).then((context) =>
    setupCore(interaction, SetupFunctions, context).then(
      (verifiable: Verifiable<T>) => ({
        ...verifiable,
        verify: () =>
          verifiable.verify().then((result: MatchResult) => {
            if (hasErrors(result)) {
              contractFile.recordFailure(
                interaction,
                [],
                context.logger,
                result
              );
            } else {
              contractFile.recordSuccess(interaction, [], context.logger);
            }
            return result;
          }),
      })
    )
  );
