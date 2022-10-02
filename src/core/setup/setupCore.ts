import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import type { Verifiable } from 'entities/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';

import type { SetupFns } from './types';

export const setupCore = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  InteractionSetup: SetupFns,
  context: MatchContext
): Promise<Verifiable<T>> => {
  const interactionType: T = interaction['case:interaction:type'];
  if (!interactionType) {
    throw new CaseCoreError(
      `Missing type on interaction. You must pass an interaction to setup`
    );
  }

  const executor = InteractionSetup[interactionType];
  if (!executor) {
    throw new CaseCoreError(
      `Missing setup for interaction type '${interactionType}'`
    );
  }

  return executor(interaction, context);
};
