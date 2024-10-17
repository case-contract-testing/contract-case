package io.contract_testing.contractcase.test.function;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualSuccessTestConfig;
import io.contract_testing.contractcase.InvokableFunctions;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.definitions.matchers.AnyInteger;
import io.contract_testing.contractcase.definitions.matchers.AnyNull;
import io.contract_testing.contractcase.definitions.mocks.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.mocks.functions.WillReceiveFunctionCall;
import java.util.List;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionImplementerExampleTest {

  static final ObjectMapper mapper = new ObjectMapper();
  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Function Implementer Example")
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
    contract.registerFunction("NoArgFunction", () -> {
      return null;
    });
    contract.runExample(new ExampleDefinition<>(
        List.of(),
        new WillReceiveFunctionCall(FunctionExecutionExample.builder()
            .arguments(List.of())
            .returnValue(new AnyNull())
            .functionName("NoArgFunction")
            .build())
    ));
  }

  @Test
  public void testOneArgFunction() {

    Function<Integer, String> functionUnderTest = (Integer num) -> num + " pages";

    contract.registerFunction("PageNumbers", convertJsonArgs(functionUnderTest));
    contract.runExample(new ExampleDefinition<>(
            List.of(),
            new WillReceiveFunctionCall(FunctionExecutionExample.builder()
                .arguments(List.of(new AnyInteger(2)))
                .returnValue("2 pages")
                .functionName("PageNumbers")
                .build())
        ),
        IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder.builder()
            .build()
    );
  }

  @NotNull
  private static InvokableFunctions.InvokableFunction1 convertJsonArgs(Function<Integer, String> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, Integer.class);
        return mapper.writeValueAsString(mapper.writeValueAsString(functionUnderTest.apply(arg1)));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }


}
