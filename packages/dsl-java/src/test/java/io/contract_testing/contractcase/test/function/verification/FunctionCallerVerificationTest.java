package io.contract_testing.contractcase.test.function.verification;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.test.function.FunctionCallerExampleTest.FirstLayer;
import io.contract_testing.contractcase.test.function.FunctionCallerExampleTest.SecondLayer;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class FunctionCallerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Caller Example")
          .providerName("Java Function Implementer Example")
          .publish(PublishType.NEVER)
          .build());
  private HashMap<String, String> mockedStore;


  @Test
  public void testVerify() throws InterruptedException {
    contract.registerFunction("NoArgFunction", () -> {
      return null;
    });

    contract.registerFunction(
        "complexReturn",
        convertJsonIntegerArg(
            (Integer v) ->
                new FirstLayer(
                    new SecondLayer(10), "d")
        )
    );

    contract.registerFunction(
        "PageNumbers",
        convertJsonIntegerArg((Integer num) -> num + " pages")
    );

    mockedStore = new HashMap<String, String>();

    contract.registerFunction(
        "keyValueStore",
        convertJsonStringArgs((String key) -> mockedStore.get(key))
    );

    contract.registerFunction(
        "throwingFunction",
        convertJsonStringArgs((String key) -> {
          throw new CustomException("The message is ignored");
        })
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
        ).stateHandler("The map is null", StateHandler.setupFunction((() -> {
          mockedStore = null;
        })))
        .stateHandler("The map is not null", StateHandler.setupFunction((() -> {
          mockedStore = new HashMap<>();
        })))
        .build()
    );

  }

  private static @NotNull <R> InvokableFunction1<?>
  convertJsonIntegerArg(Function<Integer, R> functionUnderTest) {
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


  private static <R, E extends Exception> InvokableFunction1<E>
  convertJsonStringArgs(InvokableFunction1<E> functionUnderTest) {
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
