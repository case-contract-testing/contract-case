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
      throw new CaseCoreError(`Unable to invert mock type '${t}'`);
  }
};

const inferMock = <T extends AnyMockType>(
  mock: CaseMockFor<T>,
  context: MatchContext
) => {
  context.logger.maintainerDebug('Mock is', mock);

  if (
    mock['case:run:context:asWritten'] !==
    context['case:currentRun:context:expectation']
  ) {
    const invertedType = invert(mock['case:mock:type']);
    context.logger.maintainerDebug(
      `Inverting mock from '${mock['case:mock:type']}' to '${invertedType}'`
    );
    return {
      ...mock,
      'case:mock:type': invertedType,
    };
  }
  context.logger.maintainerDebug(
    `Mock type left at '${mock['case:mock:type']}'`
  );
  return mock;
};

const executeMock = <T extends AnyMockType>(
  mock: CaseMockFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
) => {
  const mockType: T = mock['case:mock:type'];
  if (!mockType) {
    throw new CaseCoreError(
      `Missing type on mock. You must pass an mock to setup`,
      context
    );
  }

  const executor = MockSetup[mockType];
  if (!executor) {
    throw new CaseCoreError(`Missing setup for mock type '${mockType}'`);
  }

  return executor(mock, addLocation(mockType, context));
};

export const mockExecutor = <T extends AnyMockType>(
  mock: CaseMockFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
): Promise<MockData<T>> =>
  executeMock(
    inferMock(mock, addLocation('inference', context)),
    MockSetup,
    context
  );
