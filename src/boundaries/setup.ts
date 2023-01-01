import { traversals } from 'diffmatch';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';
import type { RunContext } from 'entities/context/types';
import { makeLogger } from 'connectors/logger';
import { contractFns } from 'connectors/contract';
import type { AnyState } from 'entities/nodes/states/types';
import { setupWithContext } from 'connectors/core/setup/setup';
import { resultPrinter } from 'connectors/resultPrinter';

export const setup = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  runConfig: Partial<RunContext> = {}
): Promise<Verifiable<T>> =>
  setupWithContext(
    states,
    interaction,
    Promise.resolve(
      applyDefaultContext(
        interaction,
        traversals,
        makeLogger,
        contractFns,
        resultPrinter,
        runConfig
      )
    )
  );
