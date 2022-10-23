import { SetupFunctions } from 'connectors';
import { traversals } from 'diffmatch';
import { setupCore } from 'core';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';
import type { RunContext } from 'entities/context/types';
import { makeLogger } from 'connectors/logger';

export const setup = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  runConfig: Partial<RunContext> = {}
): Promise<Verifiable<T>> =>
  setupCore(
    interaction,
    SetupFunctions,
    applyDefaultContext(interaction, traversals, makeLogger, runConfig)
  );
