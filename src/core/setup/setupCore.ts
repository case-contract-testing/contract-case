import type { MatchContext } from 'core/context/types';
import { CaseCoreError } from 'core/CaseCoreError';
import {
  type AnyInteractionType,
  SEND_HTTP_REQUEST,
  type CaseInteractionFor,
} from 'core/nodes/interactions/types';
import type { Verifiable } from 'core/types';

import type { InteractionSetupFn } from './types';
import { setupHttp } from './connectors/http';

const InteractionSetup: { [T in AnyInteractionType]: InteractionSetupFn<T> } = {
  [SEND_HTTP_REQUEST]: setupHttp,
};

export const setupCore = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
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
