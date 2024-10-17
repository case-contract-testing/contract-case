import { StateHandlers } from './types.js';
import { TriggerGroups, Trigger } from './types.triggers.js';

export interface UserNamePassword {
  /**
   * The username for basic auth
   */
  readonly username: string;
  /**
   * The password for basic auth
   */
  readonly password: string;
}

export type LogLevel =
  | 'none'
  | 'error'
  | 'warn'
  | 'debug'
  | 'maintainerDebug'
  | 'deepMaintainerDebug';

/**
 * Configure a ContractCase run. See the [configuration documentation](https://case.contract-testing.io/docs/reference/configuring) for more details.
 */
export interface ContractCaseConfig {
  /**
   * The name of the provider for this contract.
   */
  readonly providerName: string;

  /**
   * The name of the consumer for this contract.
   */
  readonly consumerName: string;

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
  readonly logLevel?: LogLevel;

  /**
   * The directory where the contract will be written. If you provide this, ContractCase
   * will generate the filename for you (unless `contractFilename` is specified,
   * in which case this setting is ignored)
   */
  readonly contractDir?: string;

  /**
   * The filename where the contract will be written. If you
   * provide this, `contractDir` is ignored
   */
  readonly contractFilename?: string;

  /**
   * @internal
   */
  readonly testRunId?: string;

  /**
   * Whether or not the results should be printed
   */
  readonly printResults?: boolean;

  /**
   * Whether or not the test should throw an error if the matching fails.
   *
   * Note that any configuration errors will still fail the suite regardless of
   * this setting. This includes exceptions thrown during trigger functions, but
   * does not include exceptions thrown by testResponse functions.
   *
   * Default: `true` in contract definition, `false` in contract verification
   */
  readonly throwOnFail?: boolean;

  /**
   * Whether to publish contracts or verification results to the broker
   *
   * `"ONLY_IN_CI"` - only when in in CI according to https://github.com/watson/ci-info#supported-ci-tools
   * `"NEVER"` or `false` - never publish
   * `"ALWAYS"` or `true` - always publish (not recommended)
   *
   * Default: `"ONLY_IN_CI"`
   */
  readonly publish?: 'ONLY_IN_CI' | 'NEVER' | 'ALWAYS' | false | true;

  /**
   * The access token to use for the contract broker. Must have CI scope.
   *
   * If this is specified along with brokerBasicAuth, the basic auth is ignored.
   */
  readonly brokerCiAccessToken?: string;

  /**
   * The base URL for the contract broker
   */
  readonly brokerBaseUrl?: string;

  /**
   * The basic authentication username and password to access the contract broker.
   *
   * If this is specified along with brokerCiAccessToken, the basic auth is ignored.
   */
  readonly brokerBasicAuth?: UserNamePassword;

  /**
   * State setup and teardown handlers for any states this test requires (see
   * [writing state handlers](https://case.contract-testing.io/docs/reference/state-handlers/))
   * for more details
   */
  readonly stateHandlers?: StateHandlers;

  /**
   * Define the trigger and test function (if any) for this interaction pair.
   *
   * Keyed by `${requestName}::${responseName}`
   *
   * Use a `TriggerGroupMap` to construct this
   */
  readonly triggers?: TriggerGroups;

  /**
   * The base URL for your real server, if you are testing an http server.
   *
   * @deprecated This will be moved to a config property that allows configuration for arbitrary mocks
   */
  readonly baseUrlUnderTest?: string;

  /**
   * Configuration for any plugins or specific mock types. Keyed by the plugin / mock shortName
   */
  readonly mockConfig?: Record<string, Record<string, unknown>>;
}

export type ContractCaseVerifierConfig = Omit<
  ContractCaseConfig,
  'consumerName'
> &
  Partial<Pick<ContractCaseConfig, 'consumerName'>>;

export interface IndividualSuccessTestConfig<
  R,
  C extends Record<string, string>,
> extends Partial<ContractCaseConfig> {
  /**
   * A trigger that will send the request (if appropriate)
   *
   * Must be specified along with `testResponse`
   *
   * See the documentation for examples
   *
   * @param config - any configuration from the mock setup
   *
   * @returns The business object from your request
   */
  readonly trigger?: Trigger<R, C>;

  /**
   * A test function that will assert that the value returned from a trigger (`data`) is correct
   *
   * @param data - the return value from the `trigger`
   * @param config - any configuration from the mock setup
   *
   * @throws Any exception if the data object does not match the expectations
   */
  readonly testResponse?: (
    data: R,
    config: Record<string, unknown>,
  ) => Promise<unknown> | void;

  /**
   * Configuration for any plugins or specific mock types. Keyed by the plugin / mock shortName
   */
  readonly mockConfig?: Record<string, Record<string, unknown>>;
}

export interface IndividualFailedTestConfig<R, C extends Record<string, string>>
  extends Partial<ContractCaseConfig> {
  /**
   * A trigger that will send the request (if appropriate)
   *
   * Must be specified along with `testErrorResponse`
   *
   * See the documentation for examples
   *
   * @param config - any configuration from the mock setup
   */
  readonly trigger?: Trigger<R, C>;

  /**
   * A test function that will take the error thrown by the trigger and assert that it is correct.
   *
   * @param err - the error thrown by the trigger
   * @param config - any configuration from the mock setup
   *
   * @throws Any exception if the error does not match the expectations
   */
  readonly testErrorResponse?: (
    err: Error,
    config: Record<string, unknown>,
  ) => Promise<unknown> | void;
}
