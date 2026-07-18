package io.contract_testing.contractcase.documentation;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.InteractionSetup;
import io.contract_testing.contractcase.configuration.Trigger;
import io.contract_testing.contractcase.configuration.TriggerGroup;
import io.contract_testing.contractcase.configuration.TriggerGroups;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import io.contract_testing.contractcase.test.httpclient.implementation.YourApiClient;
import java.io.IOException;
import java.util.Map;

public class VerifyingWithTriggers {

  private static final ContractVerifier contract = new ContractVerifier(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .providerName("http request provider")
          .build());

  public void testVerifyWithTriggers() throws InterruptedException {
    // example-extract _verify-trigger-groups
    // The trigger invokes your real client code against the mock server
    Trigger<String> getHealth = (setupInfo) -> {
      try {
        return new YourApiClient(setupInfo.getMockSetup("baseUrl")).getHealth();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    };

    contract.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
        .triggers(new TriggerGroups()
            .addTriggerGroup(new TriggerGroup<>(
                "an http \"GET\" request to \"/health\" without a body",
                getHealth,
                // Test functions for interactions where the client
                // code is expected to succeed, keyed by the
                // response description
                Map.of(
                    "a (200) response with body an object shaped like {status: \"up\"}",
                    (String result, InteractionSetup setupInfo) -> {
                      assertThat(result).isEqualTo("up");
                    }),
                // Test functions for interactions where the client
                // code is expected to throw, keyed by the
                // response description
                Map.of(
                    "a (httpStatus 4XX | 5XX) response without a body",
                    (Exception exception, InteractionSetup setupInfo) -> {
                      assertThat(exception.getMessage())
                          .isEqualTo("The server is not ready");
                    }))))
        .build());
    // end-example
  }

  public void testVerifyWithStateVariables() throws InterruptedException {
    // example-extract _verify-trigger-state-variables
    Trigger<User> getUser = (setupInfo) -> {
      try {
        return new YourApiClient(setupInfo.getMockSetup("baseUrl"))
            .getUser(setupInfo.getStateVariable("userId"));
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    };

    contract.runVerification(ContractCaseConfigBuilder.aContractCaseConfig()
        .triggers(new TriggerGroups()
            .addTriggerGroup(new TriggerGroup<>(
                "an http \"GET\" request to \"/users/{{userId}}\" without a body",
                getUser,
                Map.of(
                    "a (200) response with body an object shaped like {userId: {{userId}}}",
                    (User user, InteractionSetup setupInfo) -> {
                      assertThat(user.userId())
                          .isEqualTo(setupInfo.getStateVariable("userId"));
                    }),
                Map.of())))
        .build());
    // end-example
  }
}
