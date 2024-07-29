import { MatcherExecutor } from './matchers/types';
import { CaseMatcherFor, IsCaseNodeForType } from './matchers/utility.types';
import { MockExecutorFn } from './mocks/executors.types';
import { AnyMockDescriptor } from './mocks/nodes.types';

export * from './context/types';
export * from './logger/types';
export * from './matchers/types';
export * from './mocks/types';

/**
 * Describes the plugin name and version
 * @public
 */
export type PluginDescription = {
  /**
   * The full name of the plugin, for humans. This is printed in error messages
   * about the plugin.
   */
  humanReadableName: string;
  /**
   * The short name of the plugin, for convenience in configuration.
   *
   * This is the key used by the mockConfig configuration property.
   * It should be reasonably unique. If two plugins share a shortName, they
   * might not be able to be loaded during the same run, as plugins validate
   * their `mockConfig[shortName]` setting.
   */
  shortName: string;
  /**
   * A unique machine name, used to reason about the plugin's load state when
   * loading a plugin. This must be unique in the plugin ecosystem,
   * as collisions prevent plugins from being loaded at the same time.
   *
   * The unique names for plugins for distribution with ContractCase have the
   * prefix {@link CASE_CORE_PREFIX}. This is used to control the logging and
   * error messages during plugin loads. Only use this prefix if you are
   * developing a custom plugin that is going to be part of the core
   * distribution.
   */
  uniqueMachineName: string;
  /**
   * The version of this plugin, used to reason about it at load time.
   * Must be a semantic version string. See {@link https://semver.org/} for
   * details.
   */
  version: string;
};

/**
 * Represents a plugin for the ContractCase contract testing framework.
 * A plugin can defines custom matchers or mock setups for testing different cases.
 *
 * @public
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
  description: PluginDescription;

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
