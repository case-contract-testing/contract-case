package io.contract_testing.contractcase.documentation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.InvokableFunctions.InvokableFunction1;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.StateHandler;
import java.util.HashMap;
import java.util.function.Function;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.AfterAll;

public class Verification {

  static final ObjectMapper mapper = new ObjectMapper();

  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Java Function Caller Example")
          .providerName("Java Function Execution Example")
          .publish(PublishType.NEVER)
          .contractDir("verifiable-contracts")
          .build());


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

    // example-extract _verifying-state-handlers
    contract.runVerification(
        ContractCaseConfigBuilder.aContractCaseConfig()
            // State handlers are keyed by the name of the state.
            // This must match exactly between the name defined in the
            // contract, and the state handler at verification time.

            // A state handler either returns void, or variables.
            //
            // They can be created with the factories on StateHandler:
            //
            // StateHandler.setupFunction(() -> void)
            // StateHandler.setupFunction(() ->  Map<String, Object>)
            // StateHandler.setupAndTearDown(() -> Map<String, Object>, () -> void)
            //
            // If your state returns variables, return an object where the
            // keys are the variable names instead of void.
            .stateHandler(
                "Server is up",
                StateHandler.setupFunction(() -> {
                  // Any setup for the state 'Server is up' goes here
                })
            ).stateHandler(
                "A user exists",
                StateHandler.setupAndTeardown(
                    () -> {
                      // Any setup for the state 'A user exists' goes here
                    },
                    () -> {
                      // Any teardown for the state 'A user exists' goes here
                    }
                )
            )
            .build()
    );
    // end-example

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
