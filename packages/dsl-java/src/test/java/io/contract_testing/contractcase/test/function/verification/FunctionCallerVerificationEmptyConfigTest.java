package io.contract_testing.contractcase.test.function.verification;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;

public class FunctionCallerVerificationEmptyConfigTest {

  static final ObjectMapper mapper = new ObjectMapper();


  @Test
  public void testVerifyRunsGlobalStateHandlers() {
    final var mockedStore = new HashMap<String, String>();
    try (ContractVerifier contract = new ContractVerifier(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .consumerName("Java Function Caller Example")
            .providerName("Java Function Execution Example")
             // .logLevel(LogLevel.DEBUG)
            .publish(PublishType.NEVER)
            .contractDir("verifiable-contracts")
            .printResults(true)
            .throwOnFail(true)
            .stateHandler(
                "The key 'foo' is set to 'bar'",
                StateHandler.setupFunction(() -> {
                      mockedStore.put("foo", "bar");
                    }
                )
            ).build())) {
      contract.registerFunction("NoArgFunction", () -> {
        return null;
      });

      contract.registerFunction(
          "PageNumbers",
          convertJsonIntegerArg((Integer num) -> num + " pages")
      );

      contract.registerFunction(
          "keyValueStore",
          convertJsonStringArgs((String key) -> mockedStore.get(key))
      );

      contract.runVerification();
    }

  }

  private static @NotNull <R> InvokableFunction1
  convertJsonIntegerArg(Function<Integer, R> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, Integer.class);
        return mapper.writeValueAsString(mapper.writeValueAsString(functionUnderTest.apply(arg1)));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }

  @NotNull
  private static <R> InvokableFunction1
  convertJsonStringArgs(Function<String, R> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, String.class);
        return mapper.writeValueAsString(mapper.writeValueAsString(functionUnderTest.apply(arg1)));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }

}
