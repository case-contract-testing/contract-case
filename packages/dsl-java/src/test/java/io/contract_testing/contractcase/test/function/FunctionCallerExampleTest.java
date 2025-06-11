package io.contract_testing.contractcase.test.function;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.definitions.interactions.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.interactions.functions.WillCallFunction;
import io.contract_testing.contractcase.definitions.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyNull;
import io.contract_testing.contractcase.definitions.states.InState;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class FunctionCallerExampleTest {

  private static ContractDefiner contract;

  @BeforeAll
  static void before() {
    contract = new ContractDefiner(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("Java Function Caller Example")
            .providerName("Java Function Implementer Example")
            .publish(PublishType.NEVER)
          //  .changedContracts(ChangedContractsBehaviour.OVERWRITE)
            .adviceOverrides(Map.of("OVERWRITE_CONTRACTS_NEEDED", "Please re-run this test, but:\nFirst uncomment the changedContracts line in this unit test"))
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
            List.of(new InState("The map is null")),
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

  @Test
  public void testStatefulFunction() {

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(
                new InState("The map is not null"),
                new InState("The key 'foo' is set to 'bar'")
            ),
            new WillCallFunction(FunctionExecutionExample.builder()
                .arguments(List.of("foo"))
                .returnValue("bar")
                .functionName("keyValueStore")
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) ->
                setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of("\"foo\"")))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("\"bar\"");
            })
    );
  }


}
