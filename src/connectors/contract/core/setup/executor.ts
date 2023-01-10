import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import type {
  AnyInteractionType,
  CaseInteractionFor,
} from 'entities/nodes/interactions/types';
import type { InteractionData } from 'entities/nodes/interactions/setup.types';
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
  context.logger.maintainerDebug('Interaction is', interaction);

  if (
    interaction['case:run:context:asWritten'] !==
    context['case:currentRun:context:expectation']
  ) {
    const invertedType = invert(interaction['case:interaction:type']);
    context.logger.maintainerDebug(
      `Inverting interaction from '${interaction['case:interaction:type']}' to '${invertedType}'`
    );
    return {
      ...interaction,
      'case:interaction:type': invertedType,
    };
  }
  context.logger.maintainerDebug(
    `Interaction type left at '${interaction['case:interaction:type']}'`
  );
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
      `Missing type on interaction. You must pass an interaction to setup`,
      context
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

export const setupExecutor = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  InteractionSetup: SetupFns,
  context: MatchContext
): Promise<InteractionData<T>> =>
  executeSetup(
    inferInteraction(interaction, addLocation('inference', context)),
    InteractionSetup,
    context
  );
