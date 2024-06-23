import { MatcherExecutor } from './matchers/types';
import { CaseMatcherFor, IsCaseNodeForType } from './matchers/utility.types';
import { MockExecutorFn } from './mocks/executors.types';
import { AnyMockDescriptor } from './mocks/nodes.types';

export * from './context/types';
export * from './logger/types';
export * from './matchers/types';
export * from './mocks/types';

/**
 * Represents a plugin for the ContractCase contract testing framework.
 * A plugin can defines custom matchers or mock setups for testing different cases.
 *
 * @typeParam MatcherTypes - A union type of string constants for the matcher types supported by the plugin.
 * @typeParam MockTypes - A union type of string constants for the mocks types supported by the plugin.
 * @typeParam MatcherDescriptors - A union type of all matcher descriptor objects for the matchers supplied by this plugin.
 * @typeParam MockDescriptors - T A union type of all mock descriptor objects for the mocks supplied by this plugin
 * @typeParam AllSetupInfo - A union type representing the setup information required for all mocks supplied by this plugin.
 */
export type ContractCasePlugin<
  MatcherTypes extends string,
  MockTypes extends string,
  MatcherDescriptors extends IsCaseNodeForType<MatcherTypes>,
  MockDescriptors extends AnyMockDescriptor,
  AllSetupInfo,
> = {
  name: string;
  version: string;

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
