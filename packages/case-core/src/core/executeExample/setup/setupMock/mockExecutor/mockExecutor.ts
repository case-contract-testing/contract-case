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

import { AllMockExecutors } from '../../../../../diffmatch/types';

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
  MockSetup: AllMockExecutors,
  context: MatchContext,
) => {
  const mockType: T = mock['_case:mock:type'];
  if (!mockType) {
    throw new CaseCoreError(
      `Missing type for mock setup. You must pass a MockDescriptor to setup`,
      context,
    );
  }

  const interactionImplementation = MockSetup[mockType];
  if (!interactionImplementation) {
    context.logger.maintainerDebug(
      'Error: Missing interaction executor function for',
      mock,
    );
    throw new CaseCoreError(
      `Missing interaction executor function for interaction type '${mockType}'. 
      
      If the interaction type is a core type, this is an error in ContractCase.
     
      Alternatively, it may just mean that you need to load the plugin for the interaction type.`,
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
  return interactionImplementation.executor(
    mock,
    addLocation(mockType, context),
  );
};

export const mockExecutor = <T extends AnyMockDescriptorType>(
  mock: CaseMockDescriptorFor<AnyMockDescriptor, T>,
  allMockExecutors: AllMockExecutors,
  context: MatchContext,
): Promise<MockData<unknown, T>> =>
  executeMock(
    inferMock(mock, addLocation('inference', context)),
    allMockExecutors,
    context,
  );
