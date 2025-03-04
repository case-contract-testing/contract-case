package io.contract_testing.contractcase.test.function.verification;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.StateHandler;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionCallerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Function Caller Example")
      .providerName("Java Function Execution Example")
      .publish(PublishType.NEVER)
      .contractDir("verifiable-contracts")
      .build());


  @Test
  public void testVerify() throws InterruptedException {
    contract.registerFunction("NoArgFunction", () -> {
      return null;
    });

    contract.registerFunction(
        "PageNumbers",
        convertJsonIntegerArg((Integer num) -> num + " pages")
    );

    var mockedStore = new HashMap<String, String>();

    contract.registerFunction(
        "keyValueStore",
        convertJsonStringArgs((String key) -> mockedStore.get(key))
    );

    contract.runVerification(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
        //  .logLevel(LogLevel.MAINTAINER_DEBUG)
        .printResults(true)
        .throwOnFail(true)
        .stateHandler(
            "The key 'foo' is set to 'bar'",
            StateHandler.setupFunction(() -> {
                  mockedStore.put("foo", "bar");
                }
            )
        )
        .build()
    );

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

  @AfterAll
  static void after() {
    contract.close();
  }
}
