package io.contract_testing.contractcase.documentation;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.dsl.interactions.functions.WillCallFunction;
import io.contract_testing.contractcase.dsl.interactions.functions.WillCallThrowingFunction;
import io.contract_testing.contractcase.dsl.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.exceptions.FunctionCompletedExceptionally;
import java.util.List;

public class DefiningAFunctionContract {

  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Caller Example")
          .providerName("Java Function Implementer Example")
          .build());

  public void testCallFunction() {
    // example-extract _function-caller-define
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(),
            WillCallFunction.builder()
                .arguments(List.of(new AnyInteger(2)))
                .returnValue("2 pages")
                .functionName("PageNumbers")
                .build()),
        IndividualSuccessTestConfigBuilder.<String>builder()
            // The trigger calls the mock function that ContractCase
            // has set up for this interaction (see below)
            .withTrigger((setupInfo) ->
                parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of("2"))))
            // The testResponse function asserts on the value
            // returned by the trigger
            .withTestResponse((result, setupInfo) -> {
              assertThat(result).isEqualTo("2 pages");
            }));
    // end-example
  }

  public void testThrowingFunction() {
    // example-extract _function-caller-throwing
    contract.runThrowingInteraction(
        new InteractionDefinition<>(
            List.of(),
            WillCallThrowingFunction.builder()
                .arguments(List.of())
                .errorClassName("CustomException")
                .functionName("throwingFunction")
                .build()),
        IndividualFailedTestConfigBuilder.<String>builder()
            .withTrigger((setupInfo) ->
                parse(setupInfo.getFunction(setupInfo.getMockSetup("functionHandle"))
                    .apply(List.of())))
            // During definition, the mock function throws an exception
            // matching the errorClassName defined above
            .withTestErrorResponse((exception, setupInfo) -> {
              assertThat(exception).isInstanceOf(FunctionCompletedExceptionally.class);
            }));
    // end-example
  }

  private String parse(String json) {
    try {
      return new ObjectMapper().readValue(json, String.class);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }
}
