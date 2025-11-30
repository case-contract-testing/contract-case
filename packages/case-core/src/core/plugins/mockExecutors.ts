import {
  AllMockSetupInfos,
  AnyMockDescriptor,
} from '@contract-case/case-entities-internal';
import {
  CaseCoreError,
  MatchContext,
  MockExecutor,
} from '@contract-case/case-plugin-base';
import type { AllMockExecutors } from '../../diffmatch/plugins/types';

export const MockExecutors: AllMockExecutors = {} as AllMockExecutors;

export const getNamedVariant = <T extends AnyMockDescriptor>(
  mockDescriptor: T,
  context: MatchContext,
): T => {
  const mockType = mockDescriptor['_case:mock:type'];

  const interactionImplementation = MockExecutors[
    mockType
  ] as unknown as MockExecutor<T['_case:mock:type'], T, AllMockSetupInfos>;
  if (!interactionImplementation) {
    context.logger.maintainerDebug(
      'Error: Missing interaction executor function for',
      mockDescriptor,
    );

    const message = `Missing interaction executor function for interaction type '${mockType}'.`;

    if (typeof mockType === 'string' && mockType.startsWith('_case')) {
      throw new CaseCoreError(
        `${message} 
        
        As this interaction type is a core type, this is an error in ContractCase.`,
        context,
      );
    }
    throw new CaseCoreError(
      `${message} 
      
     This can indicate an error in ContractCase.
     
     However, as the interaction type is not from a core plugin,
     it may also indicate that you need to load the plugin that provides
     the interaction type '${mockType}'.`,
      context,
    );
  }

  return interactionImplementation.ensureMatchersAreNamed(
    mockDescriptor,
    context,
  );
};
