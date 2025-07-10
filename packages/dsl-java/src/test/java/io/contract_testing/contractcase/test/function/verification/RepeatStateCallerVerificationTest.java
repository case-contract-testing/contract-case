package io.contract_testing.contractcase.test.function.verification;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class RepeatStateCallerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Repeated State Caller Example")
      .providerName("Java Repeated State Implementer Example")
      .publish(PublishType.NEVER)
      .build());

  Integer value = 0;

  @Test
  public void testVerify() throws InterruptedException {
    contract.registerFunction("getValue", () -> {
      return "" + value;
    });

    ContractCaseConfigBuilder builder= ContractCaseConfigBuilder.aContractCaseConfig()
        //  .logLevel(LogLevel.MAINTAINER_DEBUG)
        .printResults(true)
        .throwOnFail(true);

    for(int i =0 ; i < 23; i++) {
      final int finValue = i;
      builder.stateHandler("The value is " + i, StateHandler.setupFunction(() -> {
        value = finValue;
      }));
    }


    contract.runVerification(builder.build());

  }

  private static @NotNull <R> InvokableFunction1<?> convertJsonIntegerArg(Function<Integer, R> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, Integer.class);
        return mapper.writeValueAsString(functionUnderTest.apply(arg1));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }

  @NotNull

  private static <R, E extends Exception> InvokableFunction1<E> convertJsonStringArgs(
      InvokableFunction1<E> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, String.class);
        return mapper.writeValueAsString(functionUnderTest.apply(arg1));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }

  @AfterAll
  static void after() {
    contract.close();
  }
}
