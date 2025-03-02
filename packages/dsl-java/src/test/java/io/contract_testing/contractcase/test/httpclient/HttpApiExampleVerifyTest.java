package io.contract_testing.contractcase.test.httpclient;

import static org.assertj.core.api.Assertions.assertThat;


import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractVerifier;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.InteractionSetup;
import io.contract_testing.contractcase.TestErrorResponseFunction;
import io.contract_testing.contractcase.TestResponseFunction;
import io.contract_testing.contractcase.Trigger;
import io.contract_testing.contractcase.TriggerGroup;
import io.contract_testing.contractcase.TriggerGroups;
import io.contract_testing.contractcase.test.httpclient.implementation.ApiClient;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class HttpApiExampleVerifyTest {

  private static final ContractVerifier contract = new ContractVerifier(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .providerName("http request provider")
      .publish(PublishType.NEVER)
      .contractDir("../contract-case-jest/case-contracts")
      .build());

  Trigger<String> getHealth = (setupInfo) -> {
    try {
      return new ApiClient(setupInfo.getMockSetup("baseUrl")).getHealth();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };

  Trigger<User> getUserFromConfig = (setupInfo) -> {
    try {
      return new ApiClient(setupInfo.getMockSetup("baseUrl"))
          .getUser(setupInfo.getStateVariable("userId"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };

  Trigger<User> getUserByQuery = (setupInfo) -> {
    try {
      return new ApiClient(setupInfo.getMockSetup("baseUrl"))
          .getUserQuery(setupInfo.getStateVariable("userId"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };

  Trigger<User> getUser123 = (setupInfo) -> {
    try {
      return new ApiClient(setupInfo.getMockSetup("baseUrl"))
          .getUser("123");
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };
  private final Map<String, TestResponseFunction<User>> userSuccessTests = Map.of(
      "a (200) response with body an object shaped like {userId: {{userId}}}",
      (s, setupInfo) -> {
        assertThat(s.userId()).isEqualTo(setupInfo.getStateVariable("userId"));
      }
  );
  ;
  private final Map<String, TestErrorResponseFunction> userErrorTests = Map.of(
      "a (404) response without a body",
      (e, setupInfo) -> {
        assertThat(e.getMessage()).isEqualTo("User not found");
      }
  );
  ;

  @Test
  public void testVerify() throws InterruptedException {
    contract.runVerification(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
        //  .logLevel(LogLevel.MAINTAINER_DEBUG)
        .printResults(true)
        .throwOnFail(true)
        .triggers(new TriggerGroups().addTriggerGroup(
                new TriggerGroup<>(
                    "an http \"GET\" request to \"/health\" with the following headers an object shaped like {accept: \"application/json\"} without a body",
                    getHealth
                    ,
                    Map.of(
                        "a (200) response with body an object shaped like {status: \"up\"}",
                        (String result, InteractionSetup interactionSetup) -> {
                          assertThat(result).isEqualTo("up");
                        }
                    ),
                    new HashMap<>()
                ))
            .addTriggerGroup(
                new TriggerGroup<>(
                    "an http \"GET\" request to \"/health\" without a body",
                    getHealth,
                    Map.of(
                        "a (200) response with body an object shaped like {status: <any string>}",
                        (result, setupInfo) -> {
                          assertThat(result).isInstanceOf(String.class);
                        }
                    ),
                    Map.of(
                        "a (httpStatus 4XX | 5XX) response without a body",
                        (e, setupInfo) -> {
                          assertThat(e.getMessage()).isEqualTo("The server is not ready");
                        },
                        "a (503) response with body an object shaped like {status: \"down\"}",
                        (e, setupInfo) -> {
                          assertThat(e.getMessage()).isEqualTo("The server is not ready");
                        }
                    )
                )
            )
            .addTriggerGroup(
                new TriggerGroup<>("an http \"GET\" request to \"/users/{{userId}}\" without a body",
                    getUserFromConfig,
                    userSuccessTests, Map.of()
                ))
            .addTriggerGroup(
                new TriggerGroup<>("an http \"GET\" request to \"/users/123\" without a body",
                    getUser123, Map.of(), userErrorTests
                )
            )
            .addTriggerGroup(new TriggerGroup<>(
                "an http \"GET\" request to \"/users\"?id={{userId}} without a body",
                getUserByQuery,
                userSuccessTests,
                userErrorTests
            )))
        .build());

  }

  @AfterAll
  static void after() {
    contract.close();
  }
}
