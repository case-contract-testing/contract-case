package io.contract_testing.contractcase.test.function;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.dsl.interactions.functions.WillCallFunction;
import io.contract_testing.contractcase.dsl.interactions.functions.WillCallThrowingFunction;
import io.contract_testing.contractcase.dsl.matchers.arrays.ArrayContains;
import io.contract_testing.contractcase.dsl.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.dsl.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.dsl.matchers.primitives.AnyNull;
import io.contract_testing.contractcase.dsl.states.InState;
import io.contract_testing.contractcase.exceptions.FunctionCompletedExceptionally;
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
       //     .changedContracts(ChangedContractsBehaviour.OVERWRITE)
       //     .logLevel(LogLevel.MAINTAINER_DEBUG)
            .adviceOverrides(Map.of(
                "OVERWRITE_CONTRACTS_NEEDED",
                "Please re-run this test, but:\nFirst uncomment the changedContracts line in this unit test"))
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
            WillCallFunction.builder()
                .arguments(
                    List.of())
                .returnValue(NamedMatch.builder()
                    .uniqueName("void")
                    .child(
                        AnyNull.builder()
                            .build())
                    .build())
                .functionName("NoArgFunction")
                .build()),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) -> parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of())))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo(null);
            }));
  }

  @Test
  public void testSomeArgFunction() {
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The map is null")),
            new WillCallFunction(
                "OneArgFunction",
                List.of(Map.of(
                    "one",
                    new ArrayContains(List.of(
                        Map.of("banana", "yellow"))))),
                new NamedMatch("void", new AnyNull()))),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) -> parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of("{ \"one\": [\"one\", \"two\", {\"banana\": \"yellow\"}]}"))))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo(null);
            }));
  }

  @Test
  public void testOneArgFunction() {

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The map is null")),
            WillCallFunction.builder()
                .arguments(List.of(new AnyInteger(2)))
                .returnValue("2 pages")
                .functionName("PageNumbers")
                .build()),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) -> parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of("2"))))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("2 pages");
            }));
  }

  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  public record SecondLayer(int b) {

  }

  public record FirstLayer(SecondLayer a, String c) {

  }

  private FirstLayer parseComplex(String json) {
    try {
      return new ObjectMapper().readValue(json, FirstLayer.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Test
  public void testComplexReturn() {

    var returnValueDefinition = Map.of(
        "a", Map.of("b", new AnyInteger(2)),
        "c", "d");

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The map is null")),
            WillCallFunction.builder()
                .arguments(List.of(new AnyInteger(2)))
                .returnValue(
                    returnValueDefinition)
                .functionName("complexReturn")
                .build()),
        IndividualSuccessTestConfigBuilder.<FirstLayer>builder()
            .withTrigger((setupInfo) -> parseComplex(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of("2"))))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result.c).isEqualTo("d");
              assertThat(result.a).isEqualTo(new SecondLayer(2));

              assertThat(parseComplex(contract.stripMatchers(returnValueDefinition))).isEqualTo(
                  result);
              assertThat(contract.stripMatchers(returnValueDefinition, FirstLayer.class)).isEqualTo(
                  result);

            }));
  }

  @Test
  public void testThrowingInteraction() {

    contract.runThrowingInteraction(
        new InteractionDefinition<>(
            List.of(new InState("The map is null")),
            WillCallThrowingFunction.builder()
                .arguments(List.of(new AnyInteger(2)))
                .errorClassName("CustomException")
                .functionName("throwingFunction")
                .build()),
        IndividualFailedTestConfigBuilder.<FirstLayer>builder()
            .withTrigger((setupInfo) -> parseComplex(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of("2"))))
            .withTestErrorResponse((exception, setupInfo) -> {
              assertThat(((FunctionCompletedExceptionally) exception).getErrorClassName()).isEqualTo(
                  "CustomException");
            }));

  }

  @Test
  public void testStatefulFunction() {

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(
                new InState("The map is not null"),
                new InState("The key 'foo' is set to 'bar'")),
            WillCallFunction.builder()
                .arguments(List.of("foo"))
                .returnValue("bar")
                .functionName("keyValueStore")
                .build()),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) -> parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                .apply(List.of("\"foo\""))))
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("bar");
            }));
  }

}
