import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import type { Verifiable } from 'entities/types';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import { addLocation } from 'entities/context';

import type { SetupFns } from './types';

const invert = (t: AnyInteractionType): AnyInteractionType => {
  switch (t) {
    case 'ConsumeHttpResponse':
      return 'ProduceHttpResponse';
    case 'ProduceHttpResponse':
      return 'ConsumeHttpResponse';
    default:
      throw new CaseCoreError(`Unable to invert interaction type '${t}'`);
  }
};

const inferInteraction = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  context: MatchContext
) => {
  // eslint-disable-next-line no-console
  console.log(`Inferring interaction for`, interaction, context);
  if (
    interaction['case:run:context:expectation'] !==
    context['case:run:context:expectation']
  ) {
    return {
      ...interaction,
      'case:interaction:type': invert(interaction['case:interaction:type']),
    };
  }
  return interaction;
};

const executeSetup = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  InteractionSetup: SetupFns,
  context: MatchContext
) => {
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

  return executor(interaction, addLocation(interactionType, context));
};

export const setupCore = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  InteractionSetup: SetupFns,
  context: MatchContext
): Promise<Verifiable<T>> =>
  executeSetup(
    inferInteraction(interaction, context),
    InteractionSetup,
    context
  );
