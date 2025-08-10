package io.contract_testing.contractcase.internal.edge;

import io.contract_testing.contractcase.configuration.AutoVersionFrom;
import io.contract_testing.contractcase.configuration.BrokerBasicAuthCredentials;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.configuration.TriggerGroups;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ContractCaseConnectorConfig extends ContractCaseConfig {

  public final ITriggerFunction triggerAndTest;
  private final Map<String, ConnectorStateHandler> connectorStateHandlers;
  /**
   * Triggers are deprecated in the connector config, since they're only included due to the
   * inheritance
   */
  @Deprecated(since = "*")
  public TriggerGroups triggers;

  /**
   * State handlers are deprecated in the connector config, since they're only included due to the
   * inheritance
   */
  @Deprecated(since = "*")
  public Map<String, StateHandler> stateHandlers;

  public final String testRunId;
  public final Map<String, ? extends ITriggerFunction> triggerAndTests;

  protected ContractCaseConnectorConfig(
      String providerName,
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
      Map<String, ConnectorStateHandler> stateHandlers,
      String testRunId,
      Map<String, ? extends ITriggerFunction> triggerAndTests,
      ITriggerFunction triggerAndTest,
      Map<String, Map<String, String>> mockConfig,
      AutoVersionFrom autoVersionFrom,
      Map<String, String> adviceOverrides,
      List<String> contractsToWrite) {
    super(
        providerName,
        consumerName,
        logLevel,
        contractDir,
        contractFilename,
        changedContractsBehaviour,
        printResults,
        throwOnFail,
        publish,
        brokerBaseUrl,
        brokerCiAccessToken,
        brokerBasicAuth,
        baseUrlUnderTest,
        null,
        null,
        mockConfig,
        autoVersionFrom,
        adviceOverrides,
        contractsToWrite
    );
    this.testRunId = testRunId;
    this.triggerAndTests = triggerAndTests;
    this.triggerAndTest = triggerAndTest;
    this.connectorStateHandlers = stateHandlers;

  }


  public static Builder builder() {
    return Builder.aContractCaseConnectorConfig();
  }

  public Map<String, ? extends ITriggerFunction> getTriggerAndTests() {
    return this.triggerAndTests;
  }

  public ITriggerFunction getTriggerAndTest() {
    return this.triggerAndTest;
  }

  public Map<String, ConnectorStateHandler> getConnectorStateHandlers() {
    return this.connectorStateHandlers != null
        ? Collections.unmodifiableMap(this.connectorStateHandlers)
        : null;
  }

  public Map<String, Map<String, String>> getMockConfig() {
    return this.mockConfig;
  }

  @Deprecated
  @Override
  public Map<String, StateHandler> getStateHandlers() {
    throw new RuntimeException("This method should not be called");
  }


  @Deprecated
  @Override
  public TriggerGroups getTriggers() {
    throw new RuntimeException("This method should not be called");
  }

  public ChangedContractsBehaviour getChangedContracts() {
    return this.changedContracts;
  }

  public static final class Builder {

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
    private Map<String, ConnectorStateHandler> stateHandlers;
    private String testRunId;
    private Map<String, ? extends ITriggerFunction> triggerAndTests;
    private ITriggerFunction triggerAndTest;

    private final Map<String, Map<String, String>> mockConfig = new HashMap<>();
    private AutoVersionFrom autoVersionFrom;
    private ChangedContractsBehaviour changedContracts;
    private Map<String, String> adviceOverrides;

    private List<String> contractsToWrite;

    private Builder() {
    }

    public static Builder aContractCaseConnectorConfig() {
      return new Builder();
    }

    public Builder providerName(String providerName) {
      this.providerName = providerName;
      return this;
    }

    public Builder consumerName(String consumerName) {
      this.consumerName = consumerName;
      return this;
    }

    public Builder logLevel(LogLevel logLevel) {
      this.logLevel = logLevel;
      return this;
    }

    public Builder contractDir(String contractDir) {
      this.contractDir = contractDir;
      return this;
    }

    public Builder contractFilename(String contractFilename) {
      this.contractFilename = contractFilename;
      return this;
    }

    public Builder printResults(Boolean printResults) {
      this.printResults = printResults;
      return this;
    }

    public Builder throwOnFail(Boolean throwOnFail) {
      this.throwOnFail = throwOnFail;
      return this;
    }

    public Builder publish(PublishType publish) {
      this.publish = publish;
      return this;
    }

    public Builder brokerBaseUrl(String brokerBaseUrl) {
      this.brokerBaseUrl = brokerBaseUrl;
      return this;
    }

    public Builder brokerCiAccessToken(String brokerCiAccessToken) {
      this.brokerCiAccessToken = brokerCiAccessToken;
      return this;
    }

    public Builder brokerBasicAuth(BrokerBasicAuthCredentials brokerBasicAuth) {
      this.brokerBasicAuth = brokerBasicAuth;
      return this;
    }

    public Builder baseUrlUnderTest(String baseUrlUnderTest) {
      this.baseUrlUnderTest = baseUrlUnderTest;
      return this;
    }

    public Builder stateHandlers(Map<String, ConnectorStateHandler> stateHandlers) {
      this.stateHandlers = Map.copyOf(stateHandlers);
      return this;
    }

    public Builder testRunId(String testRunId) {
      this.testRunId = testRunId;
      return this;
    }

    public Builder triggerAndTests(Map<String, ? extends ITriggerFunction> triggerAndTests) {
      this.triggerAndTests = Map.copyOf(triggerAndTests);
      return this;
    }

    public Builder triggerAndTest(ITriggerFunction triggerAndTest) {
      this.triggerAndTest = triggerAndTest;
      return this;
    }

    public Builder mockConfig(String mockShortName, Map<String, String> config) {
      this.mockConfig.put(mockShortName, Map.copyOf(config));
      return this;
    }

    public Builder autoVersionFrom(AutoVersionFrom autoVersionFrom) {
      this.autoVersionFrom = autoVersionFrom;
      return this;
    }

    public Builder changedContracts(ChangedContractsBehaviour changedContractsBehaviour) {
      this.changedContracts = changedContractsBehaviour;
      return this;
    }

    public Builder adviceOverrides(Map<String, String> adviceOverrides) {
      this.adviceOverrides = adviceOverrides;
      return this;
    }

    public Builder contractsToWrite(List<String> contractsToWrite) {
      this.contractsToWrite = contractsToWrite;
      return this;
    }


    public ContractCaseConnectorConfig build() {
      return new ContractCaseConnectorConfig(
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
          stateHandlers,
          testRunId,
          triggerAndTests,
          triggerAndTest,
          mockConfig,
          autoVersionFrom,
          adviceOverrides,
          contractsToWrite
      );
    }


  }
}