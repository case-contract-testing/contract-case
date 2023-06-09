import { ITriggerFunction } from './ITriggerFunction';
import { BoundaryStateHandler } from './StateHandler';

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

/**
 * Configure a ContractCase run. See the [configuration documentation](https://case.contract-testing.io/docs/reference/configuring) for more details.
 */
export interface ContractCaseBoundaryConfig {
  /**
   * The name of the provider for this contract.
   */
  readonly providerName: string;

  /**
   * The name of the consumer for this contract.
   */
  readonly consumerName?: string;

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
  readonly logLevel?: string;
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
   * Unique ID for this segment of the test run - it must be unique within a
   * run, but need not be unique between test runs. This is an internal
   * implementation detail, and authors of DSL layers shouldn't expose it to
   * clients.
   */
  readonly testRunId: string;

  /**
   * Whether results should be printed on standard out
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
  readonly publish?: string | undefined;

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
  readonly stateHandlers?: Record<string, BoundaryStateHandler>;

  /**
   * A Map of native trigger and test functions (if any) for several interaction pairs.
   * Most useful during verification, but also valid during definition
   *
   * Keyed by `${requestName}::${responseName}`
   */
  readonly triggerAndTests?: Record<string, ITriggerFunction>;

  /**
   * Call the native trigger and test function (if any) for this interaction pair.
   */
  readonly triggerAndTest?: ITriggerFunction;

  /**
   * The base URL for your real server, if you are testing an http server.
   *
   * @deprecated This will be moved to a config property that allows configuration for arbitrary mocks
   */
  readonly baseUrlUnderTest?: string;
}
