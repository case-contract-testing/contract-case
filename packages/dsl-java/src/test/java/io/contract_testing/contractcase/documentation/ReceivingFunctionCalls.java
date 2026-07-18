package io.contract_testing.contractcase.documentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.dsl.interactions.functions.WillReceiveFunctionCall;
import io.contract_testing.contractcase.dsl.interactions.functions.WillReceiveFunctionCallAndThrow;
import io.contract_testing.contractcase.dsl.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.test.function.verification.CustomException;
import java.util.List;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;

public class ReceivingFunctionCalls {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Implementer Example")
          .providerName("Java Function Caller Example")
          .build());

  public void testReceiveFunctionCall() {
    // example-extract _function-receiver-define
    contract.registerFunction("PageNumbers", convertJsonArgs(
        (Integer num) -> num + " pages"));

    contract.runInteraction(new InteractionDefinition<>(
        List.of(),
        WillReceiveFunctionCall.builder()
            .arguments(List.of(new AnyInteger(2)))
            .returnValue("2 pages")
            .functionName("PageNumbers")
            .build()));
    // end-example
  }

  public void testReceiveThrowingFunctionCall() {
    // example-extract _function-receiver-throwing
    contract.registerFunction("throwingFunction", () -> {
      throw new CustomException("Oh no");
    });

    contract.runInteraction(new InteractionDefinition<>(
        List.of(),
        WillReceiveFunctionCallAndThrow.builder()
            .arguments(List.of())
            .errorClassName("CustomException")
            .functionName("throwingFunction")
            .build()));
    // end-example
  }

  // example-extract _function-receiver-marshaller
  // Because the arguments and return values cross a language boundary,
  // registered functions receive JSON strings. A small adapter like this
  // parses the arguments and serialises the result of the real function.
  @NotNull
  private static InvokableFunction1<?> convertJsonArgs(
      Function<Integer, String> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, Integer.class);
        return mapper.writeValueAsString(functionUnderTest.apply(arg1));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }
  // end-example
}
