import {
  AnyMockDescriptor,
  AnyMockDescriptorType,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  CaseCoreError,
  addLocation,
  MockData,
} from '@contract-case/case-plugin-base';
import { CaseMockDescriptorFor } from '@contract-case/case-plugin-dsl-types';

import { MockSetupFns } from '../../../../../diffmatch/types';

const inferMock = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  context: MatchContext,
) => {
  context.logger.maintainerDebug('Raw mockDescriptor is', mock);

  const invertedType =
    mock['_case:run:context:setup'][
      context['_case:currentRun:context:contractMode']
    ].type;

  if (invertedType !== mock['_case:mock:type']) {
    context.logger.deepMaintainerDebug(
      `Inverting mock from '${mock['_case:mock:type']}' to '${invertedType}'`,
    );
    return {
      ...mock,
      '_case:mock:type': invertedType,
    };
  }
  context.logger.deepMaintainerDebug(
    `Mock type left at '${mock['_case:mock:type']}'`,
  );
  return mock;
};

const executeMock = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  MockSetup: MockSetupFns,
  context: MatchContext,
) => {
  const mockType: T = mock['_case:mock:type'];
  if (!mockType) {
    throw new CaseCoreError(
      `Missing type for mock setup. You must pass a MockDescriptor to setup`,
      context,
    );
  }

  const executor = MockSetup[mockType];
  if (!executor) {
    context.logger.maintainerDebug(
      'Error: Missing setup function for mock.',
      mock,
    );
    throw new CaseCoreError(
      `Missing setup function for mock type '${mockType}'. This might mean the plugin that supports this mock type is not loaded. If the mock type is a core type, this is an`,
      context,
    );
  }
  context.logger.debug(
    `Initialising a ${
      mock['_case:mock:type'].startsWith('_case:')
        ? mock['_case:mock:type'].replace('_case:', 'ContractCase ')
        : mock['_case:mock:type']
    }`,
  );
  return executor(mock, addLocation(mockType, context));
};

export const mockExecutor = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  MockSetup: MockSetupFns,
  context: MatchContext,
): Promise<MockData<unknown, T>> =>
  executeMock(
    inferMock(mock, addLocation('inference', context)),
    MockSetup,
    context,
  );
