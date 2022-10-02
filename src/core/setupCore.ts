import type { Verifiable } from './types';
import { CaseCoreError } from './CaseCoreError';
import {
  AnyInteractionType,
  CaseInteractionFor,
  SEND_HTTP_REQUEST,
} from './interactions/types';
import type { InteractionSetupFn } from './InteractionExecutors/types';
import { setupHttp } from './InteractionExecutors/http';

const InteractionSetup: { [T in AnyInteractionType]: InteractionSetupFn<T> } = {
  [SEND_HTTP_REQUEST]: setupHttp,
};

export const setupCore = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>
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

  return executor(interaction);
};
