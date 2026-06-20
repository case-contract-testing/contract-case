package io.contract_testing.contractcase.test.function.verification;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.VerificationResult;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BrokenFunctionCallerVerificationTest {

  static final ObjectMapper mapper = new ObjectMapper();

  private ContractVerifier verifier;


  @BeforeEach
  void setup() {
    verifier = new ContractVerifier(ContractCaseConfigBuilder.aContractCaseConfig()
        .consumerName("Java Function Caller Example")
        .providerName("Java Function Implementer Example")
        .publish(PublishType.NEVER)
        .printResults(false)
        //      .logLevel(LogLevel.DEEP_MAINTAINER_DEBUG)
        .contractDir("verifiable-contracts")
        .build());
    verifier.registerFunction("NoArgFunction", () -> {
      return null;
    });

    verifier.registerFunction(
        "PageNumbers",
        convertJsonIntegerArg((Integer num) -> num + " pages")
    );

    var mockedStore = new HashMap<String, String>();

    verifier.registerFunction(
        "keyValueStore",
        convertJsonStringArgs((String key) -> mockedStore.get(key))
    );

  }

  @Test
  public void testVerifyThrowsAnErrorWithMissingStateHandlers() {

    try {
      assertThrows(ContractCaseConfigurationError.class, () -> {
        verifier.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
            // Don't print any logs, otherwise CI logs get polluted with expected failures
            .logLevel(LogLevel.NONE)
            // Don't print results, otherwise CI logs get polluted with expected failures
            .printResults(false).throwOnFail(true).build());
      });
    } finally {
      verifier.close();
    }
  }

  @Test
  public void testVerifyDoesntThrowAnErrorWithThrowOnFailFalse() {

    try {

      // This contract verification should fail, but we'll ignore it, because
      // throwOnFail is set to false
      var contractHandles = verifier.prepareVerifications(ContractCaseConfigBuilder.aContractCaseConfig()
          // Don't print any logs, otherwise CI logs get polluted with expected failures
          .logLevel(LogLevel.NONE)
          // Don't print results, otherwise CI logs get polluted with expected failures
          .printResults(false).stateHandler(
              "The map is null",
              StateHandler.setupFunction(() -> {
              })
          ).stateHandler("The map is not null", StateHandler.setupFunction(() -> {}))
          .stateHandler("The key 'foo' is set to 'bar'", StateHandler.setupFunction(() -> {}))
          .throwOnFail(false).build());

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
        assertThat(result.compatibility()).isEqualTo(VerificationResult.Compatibility.INCOMPATIBLE);
      }
    } finally {
      verifier.close();
    }
  }

  private static @NotNull <R> InvokableFunction1<?> convertJsonIntegerArg(Function<Integer, R> functionUnderTest) {
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
  private static <R> InvokableFunction1<?> convertJsonStringArgs(Function<String, R> functionUnderTest) {
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
