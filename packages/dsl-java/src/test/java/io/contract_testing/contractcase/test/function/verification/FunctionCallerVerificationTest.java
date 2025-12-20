package io.contract_testing.contractcase.test.function.verification;


import static org.assertj.core.api.Assertions.assertThat;

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

  private static final ContractVerifier verifier = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Caller Example")
          .providerName("Java Function Implementer Example")
          .publish(PublishType.NEVER)
          .build());
  private HashMap<String, String> mockedStore;


  @Test
  public void testVerify() throws InterruptedException {
    verifier.registerFunction("NoArgFunction", () -> {
      return null;
    });

    verifier.registerFunction(
        "complexReturn",
        convertJsonIntegerArg(
            (Integer v) ->
                new FirstLayer(
                    new SecondLayer(10), "d")
        )
    );

    verifier.registerFunction(
        "OneArgFunction",
        (String key) -> null
    );

    verifier.registerFunction(
        "PageNumbers",
        convertJsonIntegerArg((Integer num) -> num + " pages")
    );

    mockedStore = new HashMap<String, String>();

    verifier.registerFunction(
        "keyValueStore",
        convertJsonStringArgs((String key) -> mockedStore.get(key))
    );

    verifier.registerFunction(
        "throwingFunction",
        convertJsonStringArgs((String key) -> {
          throw new CustomException("The message is ignored");
        })
    );

    var contractHandles = verifier.prepareVerifications(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
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

    assertThat(contractHandles).isNotEmpty();
    for (var contract : contractHandles) {
      contract.testHandles().forEach(verifier::runPreparedTest);
      var result = verifier.closePreparedVerification(contract);
      assertThat(result.consumerSlug()).isEqualTo("java-function-caller-example");
      assertThat(result.providerSlug()).isEqualTo("java-function-implementer-example");
      assertThat(result.description().consumerName()).isEqualTo("Java Function Caller Example");
      assertThat(result.description().providerName()).isEqualTo("Java Function Implementer Example");

      assertThat(result.contractPath()).isNotNull();
      assertThat(result.metadata().get("_case.version")).isNotNull();
    }

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
    verifier.close();
  }
}
