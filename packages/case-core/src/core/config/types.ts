import type { LogLevel } from '../../entities/logger/types';

// TODO figure out a better way to get all the config in here
import type { HttpResponseProviderConfig } from '../executeExample/setup/setupMock/mockConnectors/types';

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
  'testRunId',
  'printResults',
  'throwOnFail',
  'publish',
  'brokerCiAccessToken',
  'brokerBaseUrl',
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
   * will generate the filename for you (unless `contractFilename` is specified,
   * in which case this setting is ignored)
   */
  contractDir: string;
  /**
   * The filename where the contract will be written. If you
   * provide this, `contractDir` is ignored
   */
  contractFilename?: string;
  testRunId: string;
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
   * `"ONLY_IN_CI"` - only when in in CI according to https://github.com/watson/ci-info#supported-ci-tools
   * `"NEVER"` or `false` - never publish
   * `"ALWAYS"` or `true` - always publish (not recommended)
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
   * The internals map allows configuration of low-level ContractCase features.
   * It contains no end-user configuration properties, and is intended to be used for customisation
   * when exposing ContractCase in different languages only.
   *
   * It should never be exposed to end-users.
   */
  internals: {
    /**
     * Whether to run verification synchronously, or asynchronously (returning a
     * promise that completes when all verification is complete). Most languages
     * will want asynchronous verification, so that `verifyContract()` fails correctly.
     */
    asyncVerification: boolean;
  };
}

// TODO figure out a better way to get all the config in here
export type CaseConfig = Partial<HttpResponseProviderConfig> &
  Partial<BaseCaseConfig>;
