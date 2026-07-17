package io.contract_testing.contractcase.documentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;

public class RegisteringFunctions {

  static final ObjectMapper mapper = new ObjectMapper();

  public void testRegisterFunctions() {
    // example-extract _verify-register-functions
    ContractVerifier verifier = new ContractVerifier(
        ContractCaseConfigBuilder.aContractCaseConfig()
            .providerName("Java Function Implementer Example")
            .build());

    verifier.registerFunction("NoArgFunction", () -> null);
    verifier.registerFunction(
        "PageNumbers",
        convertJsonIntegerArg((Integer num) -> num + " pages"));

    verifier.runVerification(
        ContractCaseConfigBuilder.aContractCaseConfig().build());
    // end-example
  }

  // example-extract _verify-register-marshaller
  // Registered functions receive each argument as a JSON string, and
  // must return a JSON string. An adapter like this parses the arguments
  // and serialises the result of the real function under test.
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
  // end-example
}
