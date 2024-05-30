package io.contract_testing.contractcase;

import java.util.Map;

/**
 * Config object for ContractCase
 */
public class ContractCaseConfig {

  /**
   * The name of the provider for this contract.
   */
  public final String providerName;

  /**
   * The name of the consumer for this contract.
   */
  public final String consumerName;


  /**
   * How much should we log during the test?
   *
   * @see LogLevel
   */
  public final LogLevel logLevel;

  /**
   * The directory where the contract will be written. If you provide this, ContractCase will
   * generate the filename for you (unless `contractFilename` is specified, in which case this
   * setting is ignored)
   */
  public final String contractDir;

  /**
   * The filename where the contract will be written. If you provide this, `contractDir` is ignored
   */
  public final String contractFilename;

  /**
   * Whether results should be printed on standard out during the test run
   */
  public final Boolean printResults;


  /**
   * Whether the test should throw an error if the matching fails.
   * <p>
   * Note that any configuration errors will still fail the suite regardless of this setting. This
   * includes exceptions thrown during trigger functions, but does not include exceptions thrown by
   * testResponse functions.
   * <p>
   * Default: `true` in contract definition, `false` in contract verification
   */
  public final Boolean throwOnFail;

  /**
   * Whether to publish contracts or verification results to the broker
   *
   * @see PublishType
   */
  public final PublishType publish;

  /**
   * The base URL for the contract broker
   */
  public final String brokerBaseUrl;

  /**
   * The access token to use for the contract broker. Must have CI scope.
   * <p>
   * If this is specified along with brokerBasicAuth, the basic auth is ignored.
   */
  public final String brokerCiAccessToken;

  /**
   * The basic authentication username and password to access the contract broker.
   * <p>
   * If this is specified along with brokerCiAccessToken, basic auth credentials are ignored.
   */
  public final BrokerBasicAuthCredentials brokerBasicAuth;

  /**
   * The base URL for your real server, if you are testing an http server.
   *
   * @deprecated This will be moved to a config property that allows configuration for arbitrary
   * mocks
   */
  @Deprecated
  public final String baseUrlUnderTest;


  public final TriggerGroups triggers;

  /**
   * State setup and teardown handlers for any states this test requires (see (<a
   * href="https://case.contract-testing.io/docs/reference/state-handlers/">writing state
   * handlers</a>)) for more details
   */
  public final Map<String, StateHandler> stateHandlers;

  protected ContractCaseConfig(String providerName, String consumerName, LogLevel logLevel,
      String contractDir, String contractFilename, Boolean printResults, Boolean throwOnFail,
      PublishType publish, String brokerBaseUrl, String brokerCiAccessToken,
      BrokerBasicAuthCredentials brokerBasicAuth, String baseUrlUnderTest, TriggerGroups triggers,
      Map<String, StateHandler> stateHandlers) {
    this.providerName = providerName;
    this.consumerName = consumerName;
    this.logLevel = logLevel;
    this.contractDir = contractDir;
    this.contractFilename = contractFilename;
    this.printResults = printResults;
    this.throwOnFail = throwOnFail;
    this.publish = publish;
    this.brokerBaseUrl = brokerBaseUrl;
    this.brokerCiAccessToken = brokerCiAccessToken;
    this.brokerBasicAuth = brokerBasicAuth;
    this.baseUrlUnderTest = baseUrlUnderTest;
    this.triggers = triggers;
    this.stateHandlers = stateHandlers;
  }

  public String getProviderName() {
    return providerName;
  }

  public String getConsumerName() {
    return consumerName;
  }

  public LogLevel getLogLevel() {
    return logLevel;
  }

  public String getContractDir() {
    return contractDir;
  }

  public String getContractFilename() {
    return contractFilename;
  }

  public Boolean getPrintResults() {
    return printResults;
  }

  public Boolean getThrowOnFail() {
    return throwOnFail;
  }

  public PublishType getPublish() {
    return publish;
  }

  public String getBrokerBaseUrl() {
    return brokerBaseUrl;
  }

  public String getBrokerCiAccessToken() {
    return brokerCiAccessToken;
  }

  public BrokerBasicAuthCredentials getBrokerBasicAuth() {
    return brokerBasicAuth;
  }

  public String getBaseUrlUnderTest() {
    return baseUrlUnderTest;
  }

  public TriggerGroups getTriggers() {
    return triggers;
  }

  public Map<String, StateHandler> getStateHandlers() {
    return stateHandlers;
  }

  public static final class ContractCaseConfigBuilder {

    private String providerName;
    private String consumerName;
    private LogLevel logLevel;
    private String contractDir;
    private String contractFilename;
    private Boolean printResults;
    private Boolean throwOnFail;
    private PublishType publish;
    private String brokerBaseUrl;
    private String brokerCiAccessToken;
    private BrokerBasicAuthCredentials brokerBasicAuth;
    private String baseUrlUnderTest;
    private TriggerGroups triggers;
    private Map<String, StateHandler> stateHandlers;

    private ContractCaseConfigBuilder() {
    }

    public static ContractCaseConfigBuilder aContractCaseConfig() {
      return new ContractCaseConfigBuilder();
    }

    public ContractCaseConfigBuilder providerName(String providerName) {
      this.providerName = providerName;
      return this;
    }

    public ContractCaseConfigBuilder consumerName(String consumerName) {
      this.consumerName = consumerName;
      return this;
    }

    public ContractCaseConfigBuilder logLevel(LogLevel logLevel) {
      this.logLevel = logLevel;
      return this;
    }

    public ContractCaseConfigBuilder contractDir(String contractDir) {
      this.contractDir = contractDir;
      return this;
    }

    public ContractCaseConfigBuilder contractFilename(String contractFilename) {
      this.contractFilename = contractFilename;
      return this;
    }

    public ContractCaseConfigBuilder printResults(Boolean printResults) {
      this.printResults = printResults;
      return this;
    }

    public ContractCaseConfigBuilder throwOnFail(Boolean throwOnFail) {
      this.throwOnFail = throwOnFail;
      return this;
    }

    public ContractCaseConfigBuilder publish(PublishType publish) {
      this.publish = publish;
      return this;
    }

    public ContractCaseConfigBuilder brokerBaseUrl(String brokerBaseUrl) {
      this.brokerBaseUrl = brokerBaseUrl;
      return this;
    }

    public ContractCaseConfigBuilder brokerCiAccessToken(String brokerCiAccessToken) {
      this.brokerCiAccessToken = brokerCiAccessToken;
      return this;
    }

    public ContractCaseConfigBuilder brokerBasicAuth(BrokerBasicAuthCredentials brokerBasicAuth) {
      this.brokerBasicAuth = brokerBasicAuth;
      return this;
    }

    public ContractCaseConfigBuilder baseUrlUnderTest(String baseUrlUnderTest) {
      this.baseUrlUnderTest = baseUrlUnderTest;
      return this;
    }

    public ContractCaseConfigBuilder triggers(TriggerGroups triggers) {
      this.triggers = triggers;
      return this;
    }

    public ContractCaseConfigBuilder stateHandlers(Map<String, StateHandler> stateHandlers) {
      this.stateHandlers = stateHandlers;
      return this;
    }

    public ContractCaseConfig build() {
      return new ContractCaseConfig(
          providerName,
          consumerName,
          logLevel,
          contractDir,
          contractFilename,
          printResults,
          throwOnFail,
          publish,
          brokerBaseUrl,
          brokerCiAccessToken,
          brokerBasicAuth,
          baseUrlUnderTest,
          triggers,
          stateHandlers
      );
    }
  }
}
