package io.contract_testing.contractcase.test.function;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
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

public class RepeatStateCallerTest {

  /**
   * This class tests the runner to make sure that state handlers don't interfere with each other
   * it does this by setting the same state repeatedly with different values
   */

  private static ContractDefiner contract;

  @BeforeAll
  static void before() {
    contract = new ContractDefiner(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("Java Repeated State Caller Example")
            .providerName("Java Repeated State Implementer Example")
            .publish(PublishType.NEVER)
            //    .logLevel(LogLevel.MAINTAINER_DEBUG)
            .changedContracts(ChangedContractsBehaviour.OVERWRITE)
            .adviceOverrides(Map.of(
                "OVERWRITE_CONTRACTS_NEEDED",
                "Please re-run this test, but:\nFirst uncomment the changedContracts line in this unit test"
            ))
            .build());
  }

  @AfterAll
  static void after() {
    contract.endRecord();
  }


  @Test
  public void writeTenStates() {
    for(int i = 0; i < 23; i++ ) {
      final var value = i;
      contract.runInteraction(
          new InteractionDefinition<>(
              List.of(new InState("The value is " + value)),
              new WillCallFunction(FunctionExecutionExample.builder()
                  .arguments(List.of())
                  .returnValue(value)
                  .functionName("getValue")
                  .build())
          ),
          IndividualSuccessTestConfigBuilder.<String>builder()
              .withTrigger((setupInfo) ->
                  parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                      .apply(List.of())))
              .withTestResponse((result, setupInfo) -> {
                assertThat(result).isEqualTo( "" + value);
              })
      );
    }
  }


  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }





}
