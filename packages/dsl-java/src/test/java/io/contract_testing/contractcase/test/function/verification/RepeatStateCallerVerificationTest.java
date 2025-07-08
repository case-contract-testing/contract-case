package io.contract_testing.contractcase.test.function.verification;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
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
  private HashMap<String, String> mockedStore;

  Integer value = 0;

  @Test
  public void testVerify() throws InterruptedException {
    contract.registerFunction("getValue", () -> {
      return "" + value;
    });

    contract.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
        //  .logLevel(LogLevel.MAINTAINER_DEBUG)
        .printResults(true)
        .throwOnFail(true)
        .stateHandler("The value is 1", StateHandler.setupFunction(() -> {
          value = 1;
        })).stateHandler("The value is 2", StateHandler.setupFunction(() -> {
          value = 2;
        })).stateHandler("The value is 3", StateHandler.setupFunction(() -> {
          value = 3;
        })).stateHandler("The value is 4", StateHandler.setupFunction(() -> {
          value = 4;
        })).stateHandler("The value is 5", StateHandler.setupFunction(() -> {
          value = 5;
        })).stateHandler("The value is 6", StateHandler.setupFunction(() -> {
          value = 6;
        })).stateHandler("The value is 7", StateHandler.setupFunction(() -> {
          value = 7;
        })).stateHandler("The value is 8", StateHandler.setupFunction(() -> {
          value = 8;
        })).stateHandler("The value is 9", StateHandler.setupFunction(() -> {
          value = 9;
        })).stateHandler("The value is 0", StateHandler.setupFunction(() -> {
          value = 0;
        }))
        .build());

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
