package io.contract_testing.contractcase.configuration;

import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import java.util.HashMap;
import java.util.Map;

/**
 * Configures a single test for an API call that is expected to succeed during his test.
 *
 * @param <T> The return type of your API client code (eg {@code User} or other domain object)
 */
public class IndividualSuccessTestConfig<T> extends ContractCaseConfig {

  public final Trigger<T> trigger;
  public final TestResponseFunction<T> testResponse;

  private IndividualSuccessTestConfig(String providerName,
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
      TestResponseFunction<T> testResponse,
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
    this.testResponse = testResponse;
  }

  public static final class IndividualSuccessTestConfigBuilder<T> {

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
    private Map<String, StateHandler> stateHandlers = new HashMap<>();
    private Trigger<T> trigger;
    private TestResponseFunction<T> testResponse;

    private AutoVersionFrom autoVersionFrom;

    private final Map<String, Map<String, String>> mockConfig = new HashMap<>();
    private ChangedContractsBehaviour changedContracts;
    private Map<String,String> adviceOverrides;

    private IndividualSuccessTestConfigBuilder() {
    }

    public static <T> IndividualSuccessTestConfigBuilder<T> builder() {
      return new IndividualSuccessTestConfigBuilder<>();
    }

    public IndividualSuccessTestConfigBuilder<T> withProviderName(String providerName) {
      this.providerName = providerName;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withConsumerName(String consumerName) {
      this.consumerName = consumerName;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withLogLevel(LogLevel logLevel) {
      this.logLevel = logLevel;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withContractDir(String contractDir) {
      this.contractDir = contractDir;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withContractFilename(String contractFilename) {
      this.contractFilename = contractFilename;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withPrintResults(Boolean printResults) {
      this.printResults = printResults;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withThrowOnFail(Boolean throwOnFail) {
      this.throwOnFail = throwOnFail;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withPublish(PublishType publish) {
      this.publish = publish;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withBrokerBaseUrl(String brokerBaseUrl) {
      this.brokerBaseUrl = brokerBaseUrl;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withBrokerCiAccessToken(
        String brokerCiAccessToken) {
      this.brokerCiAccessToken = brokerCiAccessToken;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withBrokerBasicAuth(
        BrokerBasicAuthCredentials brokerBasicAuth) {
      this.brokerBasicAuth = brokerBasicAuth;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withBaseUrlUnderTest(String baseUrlUnderTest) {
      this.baseUrlUnderTest = baseUrlUnderTest;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withTriggers(TriggerGroups triggers) {
      this.triggers = triggers;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> stateHandler(String stateName, StateHandler stateHandler) {
      if (this.stateHandlers.containsKey(stateName)) {
        throw new ContractCaseConfigurationError("The state with name '" + stateName
            + "' is already set. You should only set a state handler once for each state.\n   If you need a setup and teardown handler, use the convenience methods on "
            + StateHandler.class.getName(), "INVALID_CONFIG");
      }
      this.stateHandlers.put(stateName, stateHandler);
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withTrigger(Trigger<T> trigger) {
      this.trigger = trigger;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> withTestResponse(
        TestResponseFunction<T> testResponse) {
      this.testResponse = testResponse;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> mockConfig(String mockShortName,
        Map<String, String> config) {
      this.mockConfig.put(mockShortName, config);
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> autoVersionFrom(AutoVersionFrom autoVersionFrom) {
      this.autoVersionFrom = autoVersionFrom;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> changedContracts(ChangedContractsBehaviour changedContractsBehaviour) {
      this.changedContracts = changedContractsBehaviour;
      return this;
    }

    public IndividualSuccessTestConfigBuilder<T> adviceOverrides(Map<String, String> adviceOverrides) {
      this.adviceOverrides = adviceOverrides;
      return this;
    }

    public IndividualSuccessTestConfig<T> build() {
      return new IndividualSuccessTestConfig<>(
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
          testResponse,
          mockConfig,
          autoVersionFrom,
          adviceOverrides
      );
    }
  }
}
