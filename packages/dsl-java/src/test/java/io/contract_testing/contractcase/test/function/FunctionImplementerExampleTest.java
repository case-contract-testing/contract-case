package io.contract_testing.contractcase.test.function;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig;
import io.contract_testing.contractcase.configuration.InvokableFunctions;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.definitions.interactions.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.interactions.functions.WillReceiveFunctionCall;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyInteger;
import io.contract_testing.contractcase.definitions.matchers.primitives.AnyNull;
import io.contract_testing.contractcase.test.function.verification.CustomException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionImplementerExampleTest {

  static final ObjectMapper mapper = new ObjectMapper();
  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Function Implementer Example")
      .providerName("Java Function Caller Example")
      .publish(PublishType.NEVER)
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
    contract.runInteraction(new InteractionDefinition<>(
        List.of(),
        new WillReceiveFunctionCall(FunctionExecutionExample.builder()
            .arguments(List.of())
            .returnValue(new AnyNull())
            .functionName("NoArgFunction")
            .build())
    ));
  }

  /*
  @Test
  public void testThrowingFunction() {
    contract.registerFunction("throwingFunction", () -> {
      throw new CustomException("Oh no");
    });
    contract.runInteraction(new InteractionDefinition<>(
        List.of(),
        new WillReceiveFunctionCall(FunctionExecutionExample.builder()
            .arguments(List.of())
            .returnValue(new AnyNull())
            .functionName("throwingFunction")
            .build())
    ));
  }
  */

  @Test
  public void testOneArgFunction() {

    Function<Integer, String> functionUnderTest = (Integer num) -> num + " pages";

    contract.registerFunction("PageNumbers", convertJsonArgs(functionUnderTest));
    contract.runInteraction(new InteractionDefinition<>(
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
        return mapper.writeValueAsString(functionUnderTest.apply(arg1));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }


}
