package io.contract_testing.contractcase;

import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.internal.BoundaryTriggerMapper;
import io.contract_testing.contractcase.internal.edge.ContractCaseConnectorConfig;
import org.jetbrains.annotations.NotNull;

class ConnectorConfigMapper {

  static <T> ContractCaseConnectorConfig mapSuccessExample(
      final IndividualSuccessTestConfig<T> config,
      final String testRunId) {
    var builder = makeBuilder(config, testRunId);

    if (config.trigger != null) {
      if (config.testResponse != null) {
        builder.triggerAndTest(BoundaryTriggerMapper.map(config.trigger, config.testResponse));
      } else {
        throw new ContractCaseConfigurationError(
            "Must specify `testResponse` if you are specifying a `trigger`",
            "INVALID_CONFIG"
        );

      }
    } else {
      if (config.testResponse != null) {
        throw new ContractCaseConfigurationError(
            "Must specify `trigger` if you are specifying a `testResponse` function",
            "INVALID_CONFIG"
        );
      }
    }

    return builder.build();
  }

  public static <T> ContractCaseConnectorConfig mapFailingExample(
      IndividualFailedTestConfig<T> config,
      String testRunId) {
    var builder = makeBuilder(config, testRunId);

    if (config.trigger != null) {
      if (config.testErrorResponse != null) {
        builder.triggerAndTest(BoundaryTriggerMapper.map(config.trigger, config.testErrorResponse));
      } else {
        throw new ContractCaseConfigurationError(
            "Must specify `testErrorResponse` if you are specifying a `trigger`",
            "INVALID_CONFIG"
        );
      }
    } else {
      if (config.testErrorResponse != null) {
        throw new ContractCaseConfigurationError(
            "Must specify `trigger` if you are specifying a `testErrorResponse` function",
            "INVALID_CONFIG"
        );
      }
    }

    return builder.build();
  }

  static ContractCaseConnectorConfig map(final ContractCaseConfig config,
      final String testRunId) {

    return makeBuilder(config, testRunId).build();
  }

  @NotNull
  private static ContractCaseConnectorConfig.Builder makeBuilder(ContractCaseConfig config,
      String testRunId) {
    var builder = ContractCaseConnectorConfig.builder().testRunId(testRunId);

    if (config.brokerBaseUrl != null) {
      builder.brokerBaseUrl(config.brokerBaseUrl);
    }

    if (config.providerName != null) {
      builder.providerName(config.providerName);
    }

    if (config.consumerName != null) {
      builder.consumerName(config.consumerName);
    }

    if (config.logLevel != null) {
      builder.logLevel(config.logLevel);
    }

    if (config.contractDir != null) {
      builder.contractDir(config.contractDir);
    }

    if (config.contractFilename != null) {
      builder.contractFilename(config.contractFilename);
    }

    if (config.changedContracts != null) {
      builder.changedContracts(config.changedContracts);
    }

    if (config.printResults != null) {
      builder.printResults(config.printResults);
    }

    if (config.throwOnFail != null) {
      builder.throwOnFail(config.throwOnFail);
    }

    if (config.publish != null) {
      builder.publish(config.publish);
    }
    if (config.brokerCiAccessToken != null) {
      builder.brokerCiAccessToken(config.brokerCiAccessToken);
    }

    if (config.brokerBasicAuth != null) {
      builder.brokerBasicAuth(config.brokerBasicAuth);
    }

    if (config.baseUrlUnderTest != null) {
      builder.baseUrlUnderTest(config.baseUrlUnderTest);
    }

    if (config.triggers != null) {
      builder.triggerAndTests(ConnectorTriggerGroupMapper.map(config.triggers));
    }

    if (config.stateHandlers != null) {
      builder.stateHandlers(ConnectorStateHandlerMapper.map(config.stateHandlers));
    }

    if (config.autoVersionFrom != null) {
      builder.autoVersionFrom(config.autoVersionFrom);
    }

    config.mockConfig.forEach(builder::mockConfig);

    return builder;
  }


}


