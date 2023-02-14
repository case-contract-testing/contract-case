import type { MatchContext } from 'entities/context/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import {
  AnyMockType,
  CaseMockFor,
  MOCK_HTTP_CLIENT,
  MOCK_HTTP_SERVER,
} from 'entities/nodes/mocks/types';
import type { MockData } from 'entities/nodes/mocks/setup.types';
import { addLocation } from 'entities/context';
import type { MockSetupFns } from './types';

const invert = (t: AnyMockType): AnyMockType => {
  switch (t) {
    case MOCK_HTTP_CLIENT:
      return MOCK_HTTP_SERVER;
    case MOCK_HTTP_SERVER:
      return MOCK_HTTP_CLIENT;
    default:
      throw new CaseCoreError(`Unable to invert interaction type '${t}'`);
  }
};

const inferMock = <T extends AnyMockType>(
  interaction: CaseMockFor<T>,
  context: MatchContext
) => {
  context.logger.maintainerDebug('Mock is', interaction);

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
    `Mock type left at '${interaction['case:interaction:type']}'`
  );
  return interaction;
};

const executeMock = <T extends AnyMockType>(
  interaction: CaseMockFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
) => {
  const interactionType: T = interaction['case:interaction:type'];
  if (!interactionType) {
    throw new CaseCoreError(
      `Missing type on interaction. You must pass an interaction to setup`,
      context
    );
  }

  const executor = MockSetup[interactionType];
  if (!executor) {
    throw new CaseCoreError(
      `Missing setup for interaction type '${interactionType}'`
    );
  }

  return executor(interaction, addLocation(interactionType, context));
};

export const interactionExecutor = <T extends AnyMockType>(
  interaction: CaseMockFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
): Promise<MockData<T>> =>
  executeMock(
    inferMock(interaction, addLocation('inference', context)),
    MockSetup,
    context
  );
