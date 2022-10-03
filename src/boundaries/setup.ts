import { SetupFunctions } from 'connectors';
import { traversals } from 'diffmatch';
import { setupCore } from 'core';
import { applyDefaultContext } from 'entities/context';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { Verifiable } from 'entities/types';

export const setup = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>
): Promise<Verifiable<T>> =>
  setupCore(
    interaction,
    SetupFunctions,
    applyDefaultContext(interaction, traversals)
  );
