package io.contract_testing.contractcase.test.function;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.definitions.matchers.AnyInteger;
import io.contract_testing.contractcase.definitions.matchers.AnyNull;
import io.contract_testing.contractcase.definitions.mocks.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.mocks.functions.WillCallFunction;
import java.util.List;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionCallerExampleTest {

  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Function Caller Example")
      .providerName("Java Function Execution Example")
      .publish(PublishType.NEVER)
      .contractDir("temp-contracts")
      .build());

  @AfterAll
  static void after() {
    contract.endRecord();
  }


  @Test
  public void testNoArgFunction() {
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(),
            new WillCallFunction(FunctionExecutionExample.builder()
                .arguments(List.of())
                .returnValue(new AnyNull())
                .functionName("NoArgFunction")
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) ->
                setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of()))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("null");
            })
    );
  }

  @Test
  public void testOneArgFunction() {

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(),
            new WillCallFunction(FunctionExecutionExample.builder()
                .arguments(List.of(new AnyInteger(2)))
                .returnValue("2 pages")
                .functionName("PageNumbers")
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) ->
                setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of("2")))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("\"2 pages\"");
            })
    );
  }




}
