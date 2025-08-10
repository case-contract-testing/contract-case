package io.contract_testing.contractcase.test.function;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.ContractToWrite;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.definitions.interactions.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.interactions.functions.ThrowingFunctionExecutionExample;
import io.contract_testing.contractcase.definitions.interactions.functions.WillCallFunction;
import io.contract_testing.contractcase.definitions.interactions.functions.WillCallThrowingFunction;
import io.contract_testing.contractcase.definitions.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyNull;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.exceptions.FunctionCompletedExceptionally;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class WriteHashOnlyTest {

  private static ContractDefiner contract;

  @BeforeAll
  static void before() {
    contract = new ContractDefiner(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("Write Hash Only")
            .providerName("No Provider")
            .publish(PublishType.NEVER)
            .contractsToWrite(List.of(ContractToWrite.HASH))
            //    .logLevel(LogLevel.MAINTAINER_DEBUG)
            .build());
  }

  @AfterAll
  static void after() {
    contract.endRecord();
  }


  @Test
  public void testNoArgFunction() {
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The map is null")),
            new WillCallFunction(FunctionExecutionExample.builder()
                .arguments(List.of())
                .returnValue(new NamedMatch("void", new AnyNull()))
                .functionName("NoArgFunction")
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) ->
                parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of())))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo(null);
            })
    );
  }

  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }





}
