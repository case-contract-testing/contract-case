package io.contract_testing.contractcase.test.httpclient;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ChangedContractsBehaviour;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.Trigger;
import io.contract_testing.contractcase.dsl.interactions.http.WillSendHttpRequest;
import io.contract_testing.contractcase.dsl.matchers.arrays.ArrayEachEntryMatches;
import io.contract_testing.contractcase.dsl.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.dsl.matchers.convenience.ReferenceMatch;
import io.contract_testing.contractcase.dsl.matchers.convenience.StateVariable;
import io.contract_testing.contractcase.dsl.matchers.http.HttpRequest;
import io.contract_testing.contractcase.dsl.matchers.http.HttpResponse;
import io.contract_testing.contractcase.dsl.matchers.strings.AnyString;
import io.contract_testing.contractcase.dsl.matchers.strings.StringPrefix;
import io.contract_testing.contractcase.dsl.states.InState;
import io.contract_testing.contractcase.dsl.states.InStateWithVariables;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import io.contract_testing.contractcase.test.httpclient.implementation.UserNotFoundException;
import io.contract_testing.contractcase.test.httpclient.implementation.YourApiClient;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;

public class HttpApiExampleTest {

  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Example HTTP Client")
      .providerName("Java Example HTTP Server")
      .changedContracts(ChangedContractsBehaviour.OVERWRITE)
      .publish(PublishType.NEVER)
      .build());

  Trigger<String> getHealth = (setupInfo) -> {
    try {
      return new YourApiClient(setupInfo.getMockSetup("baseUrl")).getHealth();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  };

  NamedMatch GET_USER_VIA_QUERY = new NamedMatch(
      "Get user via query",
      HttpRequest.builder()
          .path("/users")
          .query(Map.of("id", new StateVariable("userId")))
          .method("GET")
          .build()
  );

  NamedMatch GET_USER_VIA_PATH = new NamedMatch(
      "Get user via path",
      HttpRequest.builder()
          .path(new StringPrefix("/users/", new StateVariable("userId")))
          .method("GET")
          .build()
  );

  @Test
  public void testHealthUp() {
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("Server is up")),
            WillSendHttpRequest.builder()
                .request(new NamedMatch("Get health",
                    HttpRequest.builder().path("/health").method("GET").build()
                ))
                .response(HttpResponse.builder()
                    .status(200)
                    .body(Map.ofEntries(Map.entry("status", "up")))
                    .build())
                .build()
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
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("Server is down")),
            WillSendHttpRequest.builder()
                .request(new ReferenceMatch("Get health"))
                .response(HttpResponse.builder()
                    .status(200)
                    .body(Map.ofEntries(Map.entry("status", "down")))
                    .build())
                .build()
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
    contract.runThrowingInteraction(
        new InteractionDefinition<>(
            List.of(new InState("Server is broken")),
            WillSendHttpRequest.builder()
                .request(new ReferenceMatch("Get health"))
                .response(HttpResponse.builder().status(503).build())
                .build()
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
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("A user exists", Map.of("userId", "123"))
            ),
            WillSendHttpRequest.builder()
                .request(GET_USER_VIA_PATH)
                .response(HttpResponse.builder().status(200).body(Map.ofEntries(
                    Map.entry("name", new AnyString("john smith")),
                    Map.entry("userId", new StateVariable("userId")),
                    Map.entry(
                        "tags",
                        ArrayEachEntryMatches.builder().matcher(new AnyString("someTag")).build()
                    )
                )).build())
                .build()
        ),
        IndividualSuccessTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              try {
                return new YourApiClient(setupInfo.getMockSetup("baseUrl")).getUser(setupInfo.getStateVariable(
                    "userId"));
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

    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("A user exists", Map.of("userId", "123"))
            ),
            WillSendHttpRequest.builder()
                .request(GET_USER_VIA_QUERY)
                .response(HttpResponse.builder().status(200).body(Map.ofEntries(
                    Map.entry("name", new AnyString("john smith")),
                    Map.entry("userId", new StateVariable("userId"))
                )).build())
                .build()
        ),
        IndividualSuccessTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              return new YourApiClient(setupInfo.getMockSetup("baseUrl")).getUserQuery(setupInfo.getStateVariable(
                  "userId"));
            })
            .withTestResponse((user, setupInfo) -> {
              assertThat(user.userId()).isEqualTo(setupInfo.getStateVariable("userId"));
            })
    );
  }

  @Test
  public void testGetUserWithQueryVariableWhenUserNotExist() {
    contract.runThrowingInteraction(new InteractionDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables("No users exist", Map.of("userId", "123"))
            ),
            WillSendHttpRequest.builder()
                .request(GET_USER_VIA_QUERY)
                .response(HttpResponse.builder().status(404).build())
                .build()
        ),
        IndividualFailedTestConfigBuilder.<User>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo) -> {
              return new YourApiClient(setupInfo.getMockSetup("baseUrl")).getUserQuery(setupInfo.getStateVariable(
                  "userId"));
            })
            .withTestErrorResponse((exception, setupInfo) -> {
              assertThat(exception.getClass()).isEqualTo(UserNotFoundException.class);
            }));
  }

  @AfterAll
  static void after() {
    var description = contract.endRecord();
    assertThat(description.consumerSlug()).isEqualTo("java-example-http-client");
    assertThat(description.providerSlug()).isEqualTo("java-example-http-server");
    assertThat(description.contractPaths().size()).isEqualTo(2);
  }

}