package io.contract_testing.contractcase.test.function;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.definitions.matchers.AnyNull;
import io.contract_testing.contractcase.definitions.mocks.functions.FunctionExecutionExample;
import io.contract_testing.contractcase.definitions.mocks.functions.WillReceiveFunctionCall;
import java.util.List;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Disabled;
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

  public class NoArgFunction {

    public void apply() {
    }
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


}
