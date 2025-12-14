package io.contract_testing.contractcase.test.function.verification;

import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;

public class BrokenFunctionCallerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Caller Example")
          .providerName("Java Function Implementer Example")
          .publish(PublishType.NEVER)
          .printResults(false)
    //      .logLevel(LogLevel.DEEP_MAINTAINER_DEBUG)
          .contractDir("verifiable-contracts")
          .build());


  @Test
  public void testVerifyThrowsAnErrorWithMissingStateHandlers() {
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

    try {
      assertThrows(ContractCaseConfigurationError.class, () -> {
        contract.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
            // Don't print any logs, otherwise CI logs get polluted with expected failures
            .logLevel(LogLevel.NONE)
            // Don't print results, otherwise CI logs get polluted with expected failures
            .printResults(false)
            .throwOnFail(true)
            .build());
      });
    } finally {
      contract.close();
    }
  }

  private static @NotNull <R> InvokableFunction1<?>
  convertJsonIntegerArg(Function<Integer, R> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, Integer.class);
        return (mapper.writeValueAsString(functionUnderTest.apply(arg1)));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }

  @NotNull
  private static <R> InvokableFunction1<?>
  convertJsonStringArgs(Function<String, R> functionUnderTest) {
    return (String a) -> {
      try {
        var arg1 = mapper.readValue(a, String.class);
        return (mapper.writeValueAsString(functionUnderTest.apply(arg1)));
      } catch (JsonProcessingException e) {
        throw new RuntimeException("Unable to parse argument");
      }
    };
  }


}
