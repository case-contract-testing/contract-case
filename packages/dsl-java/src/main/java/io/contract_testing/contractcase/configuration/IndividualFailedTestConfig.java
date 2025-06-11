package io.contract_testing.contractcase.configuration;

import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.ContractDefiner;
import java.util.HashMap;
import java.util.Map;

/**
 * Configures a single test for an API call that is expected to throw an error during this test. For example,
 * if your API client code throws a UserNotFound exception, you'll need this configuration.
 *
 * @param <T> The return type of your API client code (e.g. {@code User} or other domain object)
 */
public class IndividualFailedTestConfig<T> extends ContractCaseConfig {

  public final Trigger<T> trigger;
  public final TestErrorResponseFunction testErrorResponse;

  private IndividualFailedTestConfig(String providerName,
      String consumerName,
      LogLevel logLevel,
      String contractDir,
      String contractFilename,
      ChangedContractsBehaviour changedContractsBehaviour,
      Boolean printResults,
      Boolean throwOnFail,
      PublishType publish,
      String brokerBaseUrl,
      String brokerCiAccessToken,
      BrokerBasicAuthCredentials brokerBasicAuth,
      String baseUrlUnderTest,
      TriggerGroups triggers,
      Map<String, StateHandler> stateHandlers,
      Trigger<T> trigger,
      TestErrorResponseFunction testErrorResponse,
      Map<String, Map<String, String>> mockConfig,
      AutoVersionFrom autoVersionFrom,
      Map<String, String> adviceOverrides) {
    super(providerName, consumerName, logLevel, contractDir, contractFilename,
        changedContractsBehaviour,
        printResults,
        throwOnFail, publish, brokerBaseUrl, brokerCiAccessToken, brokerBasicAuth, baseUrlUnderTest,
        triggers, stateHandlers, mockConfig,
        autoVersionFrom,
        adviceOverrides
    );
    this.trigger = trigger;
    this.testErrorResponse = testErrorResponse;
  }

  public static final class IndividualFailedTestConfigBuilder<T> {

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
    private final Map<String, StateHandler> stateHandlers = new HashMap<>();
    private Trigger<T> trigger;
    private TestErrorResponseFunction testErrorResponse;
    private final Map<String, Map<String, String>> mockConfig = new HashMap<>();
    private AutoVersionFrom autoVersionFrom;
    private ChangedContractsBehaviour changedContracts;
    private Map<String, String> adviceOverrides;

    private IndividualFailedTestConfigBuilder() {
    }

    /**
     * Creates a builder for configuring a test that you expect to fail.
     * @param <T> the return type of the trigger function (on success).
     */
    public static <T> IndividualFailedTestConfigBuilder<T> builder() {
      return new IndividualFailedTestConfigBuilder<>();
    }

    /**
     * @see ContractCaseConfig#providerName
     */
    public IndividualFailedTestConfigBuilder<T> withProviderName(String providerName) {
      this.providerName = providerName;
      return this;
    }

    /**
     * @see ContractCaseConfig#consumerName
     */
    public IndividualFailedTestConfigBuilder<T> withConsumerName(String consumerName) {
      this.consumerName = consumerName;
      return this;
    }

    /**
     * @see ContractCaseConfig#logLevel
     */
    public IndividualFailedTestConfigBuilder<T> withLogLevel(LogLevel logLevel) {
      this.logLevel = logLevel;
      return this;
    }

    /**
     * @see ContractCaseConfig#contractDir
     */
    public IndividualFailedTestConfigBuilder<T> withContractDir(String contractDir) {
      this.contractDir = contractDir;
      return this;
    }

    /**
     * @see ContractCaseConfig#contractFilename
     */
    public IndividualFailedTestConfigBuilder<T> withContractFilename(String contractFilename) {
      this.contractFilename = contractFilename;
      return this;
    }


    /**
     * @see ContractCaseConfig#printResults
     */
    public IndividualFailedTestConfigBuilder<T> withPrintResults(Boolean printResults) {
      this.printResults = printResults;
      return this;
    }

    /**
     * @see ContractCaseConfig#throwOnFail
     */
    public IndividualFailedTestConfigBuilder<T> withThrowOnFail(Boolean throwOnFail) {
      this.throwOnFail = throwOnFail;
      return this;
    }

    /**
     * @see ContractCaseConfig#publish
     */
    public IndividualFailedTestConfigBuilder<T> withPublish(PublishType publish) {
      this.publish = publish;
      return this;
    }

    /**
     * @see ContractCaseConfig#brokerBaseUrl
     */
    public IndividualFailedTestConfigBuilder<T> withBrokerBaseUrl(String brokerBaseUrl) {
      this.brokerBaseUrl = brokerBaseUrl;
      return this;
    }

    /**
     * @see ContractCaseConfig#brokerCiAccessToken
     */
    public IndividualFailedTestConfigBuilder<T> withBrokerCiAccessToken(
        String brokerCiAccessToken) {
      this.brokerCiAccessToken = brokerCiAccessToken;
      return this;
    }

    /**
     * @see ContractCaseConfig#brokerBasicAuth
     */
    public IndividualFailedTestConfigBuilder<T> withBrokerBasicAuth(
        BrokerBasicAuthCredentials brokerBasicAuth) {
      this.brokerBasicAuth = brokerBasicAuth;
      return this;
    }

    /**
     * @see ContractCaseConfig#baseUrlUnderTest
     */
    @Deprecated
    public IndividualFailedTestConfigBuilder<T> withBaseUrlUnderTest(String baseUrlUnderTest) {
      this.baseUrlUnderTest = baseUrlUnderTest;
      return this;
    }

    /**
     * @see ContractCaseConfig#triggers
     */
    public IndividualFailedTestConfigBuilder<T> withTriggers(TriggerGroups triggers) {
      this.triggers = triggers;
      return this;
    }

    /**
     * @see ContractCaseConfig#stateHandlers
     */
    public IndividualFailedTestConfigBuilder<T> stateHandler(String stateName,
        StateHandler stateHandler) {
      if (this.stateHandlers.containsKey(stateName)) {
        throw new ContractCaseConfigurationError("The state with name '" + stateName
            + "' is already set. You should only set a state handler once for each state.\n   If you need a setup and teardown handler, use the convenience methods on "
            + StateHandler.class.getName(), "INVALID_CONFIG");
      }
      this.stateHandlers.put(stateName, stateHandler);
      return this;
    }

    /**
     * @see ContractCaseConfig#triggers
     */
    public IndividualFailedTestConfigBuilder<T> withTrigger(Trigger<T> trigger) {
      this.trigger = trigger;
      return this;
    }


    /**
     * Provides the test function to test an exception thrown in your trigger. If you aren't
     * expecting a trigger to be thrown, you should use {@link ContractDefiner#runInteraction} instead.
     */
    public IndividualFailedTestConfigBuilder<T> withTestErrorResponse(
        TestErrorResponseFunction testErrorResponse) {
      this.testErrorResponse = testErrorResponse;
      return this;
    }


    /**
     * @see ContractCaseConfig#mockConfig
     */
    public IndividualFailedTestConfigBuilder<T> mockConfig(String mockShortName,
        Map<String, String> config) {
      this.mockConfig.put(mockShortName, config);
      return this;
    }

    public IndividualFailedTestConfigBuilder<T> autoVersionFrom(AutoVersionFrom autoVersionFrom) {
      this.autoVersionFrom = autoVersionFrom;
      return this;
    }

    public IndividualFailedTestConfigBuilder<T> changedContracts(ChangedContractsBehaviour changedContractsBehaviour) {
      this.changedContracts = changedContractsBehaviour;
      return this;
    }

    public IndividualFailedTestConfigBuilder<T> adviceOverrides(Map<String, String> adviceOverrides) {
      this.adviceOverrides = adviceOverrides;
      return this;
    }

    public IndividualFailedTestConfig<T> build() {
      return new IndividualFailedTestConfig<>(
          providerName,
          consumerName,
          logLevel,
          contractDir,
          contractFilename,
          changedContracts,
          printResults,
          throwOnFail,
          publish,
          brokerBaseUrl,
          brokerCiAccessToken,
          brokerBasicAuth,
          baseUrlUnderTest,
          triggers,
          stateHandlers,
          trigger,
          testErrorResponse,
          mockConfig,
          autoVersionFrom,
          adviceOverrides
      );
    }
  }
}
