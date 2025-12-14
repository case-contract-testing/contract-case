package io.contract_testing.contractcase.test.function;

import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.InvokableFunctions;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.dsl.interactions.functions.WillReceiveFunctionCall;
import io.contract_testing.contractcase.dsl.interactions.functions.WillReceiveFunctionCallAndThrow;
import io.contract_testing.contractcase.dsl.matchers.primitives.AnyNull;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseExpectationsNotMet;
import io.contract_testing.contractcase.test.function.verification.CustomException;
import java.util.List;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

/**
 * Tests functions called by ContractCase that don't do what you say they will.
 * Each example should
 * fail.
 */
public class BrokenFunctionImplementerExampleTest {

  static final ObjectMapper mapper = new ObjectMapper();
  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Broken Java Function Implementer Example")
          .providerName("Broken Java Function Caller Example")
          // .changedContracts(ChangedContractsBehaviour.OVERWRITE)
          .publish(PublishType.NEVER)
          .logLevel(LogLevel.NONE)
          .printResults(false)
          .build());

  @AfterAll
  static void after() {

  }

  /**
   * These are all in one test, against the usual pattern of putting tests in
   * separate functions.
   * The reason for this is to ensure that we call endRecord() at the end, and can
   * assert that it
   * fails.
   */
  @Test
  public void testNoArgFunction() {
    contract.registerFunction("NoArgFunction", () -> {
      return null;
    });

    contract.registerFunction("throwingFunction", () -> {
      throw new CustomException("Oh no");
    });

    contract.registerFunction("PageNumbers", convertJsonArgs((Integer num) -> num + " pages"));

    // When you call a function that you say should return successfully
    // and it fails, we should get an ExpectationsNotMet
    assertThrows(
        ContractCaseExpectationsNotMet.class,
        () -> contract.runInteraction(new InteractionDefinition<>(
            List.of(),
            WillReceiveFunctionCall.builder()
                .arguments(List.of())
                .returnValue(new AnyNull())
                .functionName("throwingFunction")
                .build())));

    // When you call a function that you say should throw, but it returns
    // successfully, we should get an ExpectationsNotMet
    assertThrows(
        ContractCaseExpectationsNotMet.class,
        () -> contract.runInteraction(new InteractionDefinition<>(
            List.of(),
            WillReceiveFunctionCallAndThrow.builder()
                .arguments(List.of())
                .errorClassName("CustomException")
                .functionName("NoArgFunction")
                .build())));

    // When you call end record,
    // it should throw an exception
    assertThrows(ContractCaseExpectationsNotMet.class, contract::endRecord);

    // When you try to set more interactions after calling endRecord, it should
    // fail with a configuration error
    assertThrows(ContractCaseConfigurationError.class,
        () -> contract.runInteraction(new InteractionDefinition<>(
            List.of(),
            WillReceiveFunctionCallAndThrow.builder()
                .arguments(List.of())
                .errorClassName("CustomException")
                .functionName("NoArgFunction")
                .build())));

  }

  @NotNull
  private static InvokableFunctions.InvokableFunction1<?> convertJsonArgs(Function<Integer, String> functionUnderTest) {
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
