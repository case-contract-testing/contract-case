import { MatcherExecutor } from './matchers/types';
import { CaseMatcherFor, IsCaseNodeForType } from './matchers/utility.types';
import { MockExecutorFn } from './mocks/executors.types';
import { AnyMockDescriptor } from './mocks/nodes.types';

export * from './corePlugins';
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
   *
   * If you have two plugins that need the same configuration properties,
   * it's fine for them to share their shortName.
   */
  shortName: string;
  /**
   * A unique machine name, used to reason about the plugin's load state when
   * loading a plugin. This must be unique in the plugin ecosystem,
   * as two plugins with the same uniqueMachineName can't be loaded in the same
   * contract. For this reason, it is recommended you namespace your plugin
   * names with a common prefix.
   *
   * This is different from the shortname above, since you might have multiple
   * plugins wanting to share configuration, and the global uniqueness
   * constraint means that the uniqueMachineName might be too clumsy for a user
   * to comfortably use them as a configuration key.
   *
   * Plugins for distribution with ContractCase have their unique names
   * prefixed with {@link CORE_PLUGIN_PREFIX}. This is used to control the
   * logging and error messages during plugin loads. To keep the logs and error
   * messages correct, only use this prefix if you are developing core a plugin.
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
