// TODO figure out a better way to get all the config in here
import { HttpResponseProviderConfig } from '@contract-case/case-core-plugin-http';
import { LogLevel } from '@contract-case/case-plugin-base';

type IsStringArg<K> = K extends keyof Required<BaseCaseConfig>
  ? [Required<BaseCaseConfig>[K]] extends [string | boolean]
    ? K
    : never
  : never;

export const stringConfigArgs: Array<IsStringArg<keyof BaseCaseConfig>> = [
  'providerName',
  'consumerName',
  'logLevel',
  'contractDir',
  'contractFilename',
  'changedContracts',
  'testRunId',
  'printResults',
  'throwOnFail',
  'publish',
  'brokerCiAccessToken',
  'brokerBaseUrl',
  'autoVersionFrom',
];

export interface BaseCaseConfig {
  /**
   * The name of the provider for this contract.
   */
  providerName: string;

  /**
   * The name of the consumer for this contract.
   */
  consumerName: string;

  /**
   * logLevel - one of:
   *
   * `"none"` - Print no logs (note, results may still be printed - see `printResults`)
   *
   * `"error"` - Something has gone wrong during the execution of the test framework
   *
   * `"warn"` - It seems likely that there is a misconfiguration
   *
   * `"debug"` - Information to help users find out what is happening during their tests
   *
   * `"maintainerDebug" | "deepMaintainerDebug"` - debugging information for ContractCase maintainers
   */
  logLevel?: LogLevel;

  /**
   * The directory where the contract will be written. If you provide this, ContractCase
   * will store contracts in subdirectories for each provider, and the
   * filename is automatically generated from the consumer name and a hash of the contract contents:
   *
   * `${consumerName}-${hashOfContract}.case.json`.
   */
  contractDir: string;

  /**
   * The filename where the contract will be written. If you
   * provide this, `contractDir` is ignored
   */
  contractFilename?: string;

  /**
   * What to do if contracts have changed?
   *
   * - `"OVERWRITE"`: Replace the previous contract file
   * - `"FAIL"`: Fail if attempting to write a contract that's different
   *   to the previous one
   */
  changedContracts: 'OVERWRITE' | 'FAIL';

  /**
   * An ID for the whole test run. This was originally used to generate
   * filenames, but now that the contracts are hashed, this is no longer
   * necessary.
   *
   * Probably we can remove this in a future version?
   */
  testRunId: string;

  /**
   * Whether or not to print test results using the Result Printer (defaults to
   * standard out)
   */
  printResults: boolean;

  /**
   * Whether or not the test should throw an error if the matching fails.
   *
   * Note that any configuration errors will still fail the suite regardless of
   * this setting. This includes exceptions thrown during trigger functions, but
   * does not include exceptions thrown by testResponse functions.
   *
   * Default: `true` in contract definition, `false` in contract verification
   */
  throwOnFail?: boolean;

  /**
   * Whether to publish contracts or verification results to the broker
   *
   * - `"ONLY_IN_CI"` - only when in in CI according to https://github.com/watson/ci-info#supported-ci-tools
   * - `"NEVER"` or `false` - never publish
   * - `"ALWAYS"` or `true` - always publish (not recommended)
   *
   * Default: `"ONLY_IN_CI"`
   */
  publish?: false | true | 'ONLY_IN_CI' | 'NEVER' | 'ALWAYS';

  /**
   * The access token to use for the contract broker. Must have CI scope.
   *
   * If this is specified along with brokerBasicAuth, the basic auth is ignored.
   */
  brokerCiAccessToken?: string;

  /**
   * The base URL for the contract broker
   */
  brokerBaseUrl?: string;

  /**
   * The basic authentication username and password to access the contract broker.
   *
   * If this is specified along with brokerCiAccessToken, the basic auth is ignored.
   */
  brokerBasicAuth?: {
    /**
     * The username for basic auth
     */
    username: string;
    /**
     * The password for basic auth
     */
    password: string;
  };

  /**
   * Where to automatically get the version for the service under test.
   *
   * - `TAG` get the version from the git tag using absolute-version
   * - `GIT_SHA` get the version from the full git sha
   *
   * If there is no git repository, then versioning will fail.
   *
   * @defaultValue `'TAG'`
   */
  autoVersionFrom?: 'TAG' | 'GIT_SHA';

  /**
   * The internals map allows configuration of low-level ContractCase features.
   * It contains no end-user configuration properties, and is intended to be used for customisation
   * when exposing ContractCase in different languages only.
   *
   * It should never need to be exposed to end-users.
   */
  internals: {
    /**
     * Whether to run verification synchronously, or asynchronously (returning a
     * promise that completes when all verification is complete). Most languages
     * will want asynchronous verification, so that `verifyContract()` fails correctly.
     */
    asyncVerification: boolean;
  };

  /**
   * A string to add at the start of the log context when initialising it.
   *
   * Used to indicate which contract we're looking at. If it's not present, the
   * behaviour is the same as if it were set to `''`
   *
   * Like all properties that start with `core`, this is not intended to be
   * exposed to users.
   */
  coreLogContextPrefix?: string;

  /**
   * This allows for advanced customisation of the advice that ContractCase
   * prints when configuration errors or other issues happen. It's exposed so
   * that enterprise users or people with common wrappers can customise the log
   * and error output
   *
   * Most users will not need to set this property
   *
   * The key is the error code that you want to override the advice for, the
   * value is the new string to use instead.
   */
  adviceOverrides: Record<string, string>;
}

type PluginConfig = {
  /**
   * The mockConfig object is keyed by plugin short names (eg 'http'), and contains
   * arbitrary configuration for plugins. It's up to individual plugins to
   * validate their own configuration.
   */
  mockConfig: Record<string, Record<string, unknown>>;
};

// TODO Replace HttpResponseProviderConfig with uses of PluginConfig
export type CaseConfig = Partial<HttpResponseProviderConfig> &
  Partial<BaseCaseConfig> &
  Partial<PluginConfig>;

export type DefaultConfig = Partial<BaseCaseConfig>;
