package io.contract_testing.contractcase.documentation;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.definitions.matchers.AnyString;
import io.contract_testing.contractcase.definitions.matchers.HttpRequest;
import io.contract_testing.contractcase.definitions.matchers.HttpRequestExample;
import io.contract_testing.contractcase.definitions.matchers.HttpResponse;
import io.contract_testing.contractcase.definitions.matchers.HttpResponseExample;
import io.contract_testing.contractcase.definitions.matchers.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.StateVariable;
import io.contract_testing.contractcase.definitions.mocks.http.HttpExample;
import io.contract_testing.contractcase.definitions.mocks.http.WillSendHttpRequest;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.definitions.states.InStateWithVariables;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import io.contract_testing.contractcase.test.httpclient.implementation.YourApiClient;
import java.util.List;
import java.util.Map;

public class CreatingAContract {

  // example-extract _creating-a-contract
  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Example-Client")
          .providerName("Example-Server")
          .build());


  public void testSomeApiMethod() {
    contract.runExample(
        /* described later in this chapter */
        // ignore-extract
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
            .withTrigger((setupInfo1) -> {
              return new YourApiClient(setupInfo1.getMockSetup("baseUrl")).getHealth();
            })
            .withTestResponse((status, setupInfo) -> {
            })
        // end-ignore
    );
  }

  public void testSomeFailingMethod() {
    contract.runThrowingExample(
        /* described later in this chapter */
        // ignore-extract
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
        IndividualFailedTestConfigBuilder.<String>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger((setupInfo1) -> {
              return new YourApiClient(setupInfo1.getMockSetup("baseUrl")).getHealth();
            })
            .withTestErrorResponse((thrown, setupInfo) -> {
            })
        // end-ignore
    );
  }
  // end-example


  // example-extract _defining-an-example
  public void testGetUser() {
    contract.runExample(
        new ExampleDefinition<>(
            List.of(), // State definitions, covered below
            new WillSendHttpRequest(HttpExample.builder()
                .request(
                    new HttpRequest(HttpRequestExample.builder()
                        .method("GET")
                        .path("/users/foo")
                        .build())
                )
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(
                        // Note that we only describe the fields
                        // that your consumer actually needs for
                        // this particular test.  The real response
                        // might have more elements, but if your
                        // consumer doesn't need them, you don't
                        // need to put them in the contract.
                        Map.ofEntries(
                            Map.entry("type", "member"),
                            Map.entry("name", "john smith")
                        )
                    )
                    .build()))
                .build())
        ),
        // ignore-extract
        IndividualSuccessTestConfigBuilder.builder()
            .withProviderName("Java Example HTTP Server")
            .withTestResponse((status, setupInfo) -> {
            })
        // end-ignore
    );
  }
  // end-example


  public void testGetUserMatchers() {
    contract.runExample(
        new ExampleDefinition<>(
            List.of(
                // example-extract _matchers-state-no-vars
                new InState("A user with id \"foo\" exists"),
                // end-example
                // example-extract _matchers-state-with-vars
                new InStateWithVariables(
                    "A user exists",
                    Map.ofEntries(
                        Map.entry("userId", "123")
                    )
                ),
                // end-example
                new InStateWithVariables(
                    "This is here so we have a comma in the previous state",
                    Map.ofEntries(Map.entry("userId", "123"))
                )
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(
                    new HttpRequest(HttpRequestExample.builder()
                        .method("GET")
                        .path("/users/foo")
                        .build())
                )
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)

                    .body(
                        // Note that we only describe the fields
                        // that your consumer actually needs for
                        // this particular test.  The real response
                        // might have more elements, but if your
                        // consumer doesn't need them, you don't
                        // need to put them in the contract.
                        Map.ofEntries(
                            Map.entry("status", "up"),
                            Map.entry("name", "john smith")
                        )
                    )
                    .build()))
                .build())
        ),
        // ignore-extract
        IndividualSuccessTestConfigBuilder.builder()
            .withProviderName("Java Example HTTP Server")
            .withTestResponse((status, setupInfo) -> {
            })
        // end-ignore
    );

    // example-extract _matchers-state-vars-complete
    contract.runExample(
        new ExampleDefinition<>(
            List.of(
                new InStateWithVariables(
                    "A user exists",
                    Map.ofEntries(
                        Map.entry("userId", "123")
                    )
                )
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(
                    new HttpRequest(HttpRequestExample.builder()
                        .method("GET")
                        .path("/users")
                        // The StateVariable matcher tells ContractCase that
                        // the id in the query will be the userId from the
                        // state setup.
                        .query(Map.of("id", new StateVariable("userId")))
                        .build())
                )
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(
                        Map.ofEntries(
                            // In the response body, we expect the
                            // userId to be the same as the one set up
                            // during state setup
                            Map.entry("id", new StateVariable("userId")),
                            // and the name may be any non-empty string
                            // (but during the contract definition, it will be "John Smith")
                            Map.entry("name", new AnyString("john smith"))
                        )
                    )
                    .build()))
                .build())
        ),
        IndividualSuccessTestConfigBuilder.builder()
            .withTrigger(
                (interactionSetup) ->
                    new YourApiClient(interactionSetup.getMockSetup("baseUrl"))
                        .getUserQuery(interactionSetup.getStateVariable("userId")))
            .withTestResponse(
                (user, config) -> {
                  assertThat(user).isEqualTo(new User("foo", ""));
                })
    );
    // end-example

    contract.runExample(
        new ExampleDefinition<>(
            List.of(
                new InStateWithVariables(
                    "A user exists",
                    Map.ofEntries(
                        Map.entry("userId", "123")
                    )
                )
            ),
            new WillSendHttpRequest(HttpExample.builder()
                .request(
                    new HttpRequest(HttpRequestExample.builder()
                        .method("GET")
                        .path("/users")
                        // The StateVariable matcher tells ContractCase that
                        // the id in the query will be the userId from the
                        // state setup.
                        .query(Map.of("id", new StateVariable("userId")))
                        .build())
                )
                .response(new HttpResponse(HttpResponseExample.builder()
                    .status(200)
                    .body(
                        Map.ofEntries(
                            // In the response body, we expect the
                            // userId to be the same as the one set up
                            // during state setup
                            Map.entry("id", new StateVariable("userId")),
                            // and the name may be any non-empty string
                            // (but during the contract definition, it will be "John Smith")
                            Map.entry("name", new AnyString("john smith"))
                        )
                    )
                    .build()))
                .build())
        ),
        // example-extract _trigger-http-client
        IndividualSuccessTestConfigBuilder.builder()
            .withTrigger(
                (interactionSetup) ->
                    new YourApiClient(
                        interactionSetup.getMockSetup("baseUrl")
                    ).getUserQuery(
                        interactionSetup.getStateVariable("userId")
                    )
            )
            // end-example
            .withTestResponse(
                (user, config) -> {
                  assertThat(user).isEqualTo(new User("foo", ""));
                })
    );

  }
}
