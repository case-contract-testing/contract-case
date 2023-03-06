import { CaseCoreError } from '../../../../../../../entities';
import { addLocation } from '../../../../../../../entities/context';
import type { MockData } from '../../../../../../../entities/nodes/types';
import type {
  AnyMockDescriptorType,
  CaseMockDescriptorFor,
  MatchContext,
} from '../../../../../../../entities/types';

import type { MockSetupFns } from './types';

const inferMock = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<T>,
  context: MatchContext
) => {
  context.logger.maintainerDebug('Raw mockDescriptor is', mock);

  const invertedType =
    mock['case:run:context:setup'][
      context['case:currentRun:context:contractMode']
    ].type;

  if (invertedType !== mock['case:mock:type']) {
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

const executeMock = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
) => {
  const mockType: T = mock['case:mock:type'];
  if (!mockType) {
    throw new CaseCoreError(
      `Missing type for mock setup. You must pass a MockDescriptor to setup`,
      context
    );
  }

  const executor = MockSetup[mockType];
  if (!executor) {
    throw new CaseCoreError(`Missing setup for mock type '${mockType}'`);
  }
  context.logger.debug(`Initialising a ${mock['case:mock:type']}`);
  return executor(mock, addLocation(mockType, context));
};

export const mockExecutor = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<T>,
  MockSetup: MockSetupFns,
  context: MatchContext
): Promise<MockData<T>> =>
  executeMock(
    inferMock(mock, addLocation('inference', context)),
    MockSetup,
    context
  );
