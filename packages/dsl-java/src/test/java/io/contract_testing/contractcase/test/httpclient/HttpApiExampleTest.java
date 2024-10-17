package io.contract_testing.contractcase.test.httpclient;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.PublishType;
import io.contract_testing.contractcase.Trigger;
import io.contract_testing.contractcase.definitions.matchers.AnyString;
import io.contract_testing.contractcase.definitions.matchers.HttpRequest;
import io.contract_testing.contractcase.definitions.matchers.HttpRequestExample;
import io.contract_testing.contractcase.definitions.matchers.HttpResponse;
import io.contract_testing.contractcase.definitions.matchers.HttpResponseExample;
import io.contract_testing.contractcase.definitions.matchers.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.ReferenceMatch;
import io.contract_testing.contractcase.definitions.matchers.StateVariable;
import io.contract_testing.contractcase.definitions.matchers.StringPrefix;
import io.contract_testing.contractcase.definitions.mocks.http.HttpExample;
import io.contract_testing.contractcase.definitions.mocks.http.WillSendHttpRequest;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.definitions.states.InStateWithVariables;
import io.contract_testing.contractcase.test.httpclient.implementation.ApiClient;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import io.contract_testing.contractcase.test.httpclient.implementation.UserNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class HttpApiExampleTest {

  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Example HTTP Client")
      .providerName("Java Example HTTP Server")
      .publish(PublishType.NEVER)
      .contractDir("temp-contracts")
      .build());

  Trigger<String> getHealth = (setupInfo) -> {
    try {
      return new ApiClient(setupInfo.getMockSetup("baseUrl")).getHealth();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };

  NamedMatch GET_USER_VIA_QUERY = new NamedMatch(
      "Get user via query",
      new HttpRequest(HttpRequestExample.builder()
          .path("/users")
          .query(Map.of("id", new StateVariable("userId")))
          .method("GET")
          .build())
  );

  NamedMatch GET_USER_VIA_PATH = new NamedMatch(
      "Get user via path",
      new HttpRequest(HttpRequestExample.builder()
          .path(new StringPrefix("/users/", new StateVariable("userId")))
          .method("GET")
          .build())
  );

  @Test
  public void testHealthUp() {
    contract.runExample(
        new ExampleDefinition<>(
            List.of(new InState("Server is up")),
            new WillSendHttpRequest(HttpExample.builder()
                .request(new NamedMatch(
                    "Get health",
                    new HttpRequest(HttpRequestExample.builder()
                        .path("/health")
                        .method("GET")
                        .build())
                ))
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(Map.ofEntries(Map.entry("status", "up")))
                    .build()))
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger(getHealth)
            .withTestResponse((status, setupInfo) -> {
              assertThat(status).isEqualTo("up");
            })
    );
  }

  @Test
  public void testHealthDown() {
    contract.runExample(
        new ExampleDefinition<>(
            List.of(new InState("Server is down")),
            new WillSendHttpRequest(HttpExample.builder()
                .request(new ReferenceMatch("Get health"))
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(Map.ofEntries(Map.entry("status", "down")))
                    .build()))
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger(getHealth)
            .withTestResponse((status, setupInfo) -> {
              assertThat(status).isEqualTo("down");
            })
    );
  }

  @Test
  public void testHealthUnavailable() {
    contract.runThrowingExample(
        new ExampleDefinition<>(
            List.of(new InState("Server is broken")),
            new WillSendHttpRequest(HttpExample.builder()
                .request(new ReferenceMatch("Get health"))
                .response(new HttpResponse(HttpResponseExample.builder().status(503).build()))
                .build())
        ),
        IndividualFailedTestConfigBuilder.<String>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger(getHealth)
            .withTestErrorResponse((exception, setupInfo) -> {
              assertThat(exception.getMessage()).isEqualTo("The server is not ready");
            })
    );
  }


  @Test
  public void testGetUserWithPathVariable() {
    contract.runExample(
        new ExampleDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("A user exists", Map.of("userId", "123"))
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(GET_USER_VIA_PATH)
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(Map.ofEntries(
                        Map.entry("name", new AnyString("john smith")),
                        Map.entry("userId", new StateVariable("userId"))
                    ))
                    .build()))
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              try {
                return new ApiClient(setupInfo.getMockSetup("baseUrl"))
                    .getUser(setupInfo.getStateVariable("userId"));
              } catch (IOException e) {
                throw new RuntimeException(e);
              }
            })
            .withTestResponse((user, setupInfo) -> {
              assertThat(user.userId()).isEqualTo(setupInfo.getStateVariable("userId"));
            })
    );

  }


  @Test
  public void testGetUserWithQueryVariable() {

    contract.runExample(
        new ExampleDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("A user exists", Map.of("userId", "123"))
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(GET_USER_VIA_QUERY)
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(Map.ofEntries(
                        Map.entry("name", new AnyString("john smith")),
                        Map.entry("userId", new StateVariable("userId"))
                    ))
                    .build()))
                .build())
        ),
        IndividualSuccessTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              try {
                return new ApiClient(setupInfo.getMockSetup("baseUrl"))
                    .getUserQuery(setupInfo.getStateVariable("userId"));
              } catch (IOException e) {
                throw new RuntimeException(e);
              }
            })
            .withTestResponse((user, setupInfo) -> {
              assertThat(user.userId()).isEqualTo(setupInfo.getStateVariable("userId"));
            })
    );
  }

  @Test
  public void testGetUserWithQueryVariableWhenUserNotExist() {
    contract.runThrowingExample(
        new ExampleDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("No users exist", Map.of("userId", "123"))
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(GET_USER_VIA_QUERY)
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(404).build())
                ).build()
            )
        ),
        IndividualFailedTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              try {
                return new ApiClient(setupInfo.getMockSetup("baseUrl"))
                    .getUserQuery(setupInfo.getStateVariable("userId"));
              } catch (IOException e) {
                throw new RuntimeException(e);
              }
            })
            .withTestErrorResponse((exception, setupInfo) -> {
              assertThat(exception.getClass()).isEqualTo(UserNotFoundException.class);
            })
    );
  }


  @AfterAll
  static void after() {
    contract.endRecord();
  }

}