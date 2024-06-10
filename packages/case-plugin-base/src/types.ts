import { MatcherExecutor } from './matchers/types';
import { CaseMatcherFor, IsCaseNodeForType } from './matchers/utility.types';
import { MockExecutorFn } from './mocks/executors.types';
import { AnyMockDescriptor } from './mocks/nodes.types';

export * from './context/types';
export * from './logger/types';
export * from './matchers/types';
export * from './mocks/types';

export type ContractCasePlugin<
  MatcherTypes extends string,
  MockTypes extends string,
  MatcherDescriptors extends IsCaseNodeForType<MatcherTypes>,
  MockDescriptors extends AnyMockDescriptor,
  AllSetupInfo,
> = {
  matcherExecutors: {
    [T in MatcherTypes]: MatcherExecutor<
      T,
      CaseMatcherFor<MatcherDescriptors, T>
    >;
  };

  setupMocks: {
    [T in MockTypes]: MockExecutorFn<MockDescriptors, AllSetupInfo, T>;
  };
};
