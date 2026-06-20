package io.contract_testing.contractcase.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import org.junit.jupiter.api.Test;

class NoInteractionsDefineTest {

  private static ContractDefiner emptyContract() {
    return new ContractDefiner(
        ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("empty contract consumer")
            .providerName("empty contract provider")
            .publish(PublishType.NEVER)
            .logLevel(LogLevel.NONE)
            .printResults(false)
            .build());
  }

  @Test
  void writingAnEmptyContractFailsWithNoInteractionsDefined() {
    assertThatThrownBy(() -> emptyContract().endRecord())
        .isInstanceOf(ContractCaseConfigurationError.class)
        .satisfies((e) -> assertThat(
            ((ContractCaseConfigurationError) e).getErrorCode())
            .isEqualTo("NO_INTERACTIONS_DEFINED"));
  }
}
