package io.contract_testing.contractcase.documentation;

import static org.assertj.core.api.Assertions.assertThat;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.dsl.interactions.http.WillSendHttpRequest;
import io.contract_testing.contractcase.dsl.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.dsl.matchers.convenience.StateVariable;
import io.contract_testing.contractcase.dsl.matchers.http.HttpRequest;
import io.contract_testing.contractcase.dsl.matchers.http.HttpResponse;
import io.contract_testing.contractcase.dsl.matchers.strings.AnyString;
import io.contract_testing.contractcase.dsl.states.InState;
import io.contract_testing.contractcase.dsl.states.InStateWithVariables;
import io.contract_testing.contractcase.test.httpclient.implementation.User;
import io.contract_testing.contractcase.test.httpclient.implementation.YourApiClient;
import java.util.List;
import java.util.Map;

public class CreatingAContract {

    // example-extract _creating-a-contract
    private static final ContractDefiner contract = new ContractDefiner(
            ContractCaseConfigBuilder.aContractCaseConfig()
                    .consumerName("Example-Client")
                    .providerName("Example-Server")
                    .build());

    public void testSomeApiMethod() {
        contract.runInteraction(
                /* described later in this chapter */
                // ignore-extract
                new InteractionDefinition<>(
                        List.of(new InState("Server is up")),
                        WillSendHttpRequest.builder()
                                .request(
                                        new NamedMatch(
                                                "Get health",
                                                HttpRequest.builder()
                                                        .path("/health")
                                                        .method("GET")
                                                        .build()))
                                .response(
                                        HttpResponse.builder()
                                                .status(200)
                                                .body(Map.ofEntries(Map.entry("status", "up")))
                                                .build())
                                .build()),
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
        contract.runThrowingInteraction(
                /* described later in this chapter */
                // ignore-extract
                new InteractionDefinition<>(
                        List.of(new InState("Server is up")),
                        WillSendHttpRequest.builder()
                                .request(
                                        new NamedMatch(
                                                "Get health",
                                                HttpRequest.builder()
                                                        .path("/health")
                                                        .method("GET")
                                                        .build()))
                                .response(
                                        HttpResponse.builder()
                                                .status(200)
                                                .body(Map.ofEntries(Map.entry("status", "up")))
                                                .build())
                                .build()),
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
        contract.runInteraction(
                new InteractionDefinition<>(
                        List.of(), // State definitions, covered below
                        WillSendHttpRequest.builder()
                                .request(
                                        HttpRequest.builder()
                                                .method("GET")
                                                .path("/users/foo")
                                                .build())
                                .response(HttpResponse.builder()
                                        .status(200)
                                        .body(
                                                // Note that we only describe the fields
                                                // that your consumer actually needs for
                                                // this particular test. The real response
                                                // might have more elements, but if your
                                                // consumer doesn't need them, you don't
                                                // need to put them in the contract.
                                                Map.ofEntries(
                                                        Map.entry("type", "member"),
                                                        Map.entry("name", "john smith")))
                                        .build())
                                .build()),
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
        contract.runInteraction(
                new InteractionDefinition<>(
                        List.of(
                                // example-extract _matchers-state-no-vars
                                new InState("A user with id \"foo\" exists"),
                                // end-example
                                // example-extract _matchers-state-with-vars
                                new InStateWithVariables(
                                        "A user exists",
                                        Map.ofEntries(
                                                Map.entry("userId", "123"))),
                                // end-example
                                new InStateWithVariables(
                                        "This is here so we have a comma in the previous state",
                                        Map.ofEntries(Map.entry("userId", "123")))),
                        WillSendHttpRequest.builder()
                                .request(
                                        HttpRequest.builder()
                                                .method("GET")
                                                .path("/users/foo")
                                                .build())
                                .response(HttpResponse.builder()
                                        .status(200)

                                        .body(
                                                // Note that we only describe the fields
                                                // that your consumer actually needs for
                                                // this particular test. The real response
                                                // might have more elements, but if your
                                                // consumer doesn't need them, you don't
                                                // need to put them in the contract.
                                                Map.ofEntries(
                                                        Map.entry("status", "up"),
                                                        Map.entry("name", "john smith")))
                                        .build())
                                .build()),
                // ignore-extract
                IndividualSuccessTestConfigBuilder.builder()
                        .withProviderName("Java Example HTTP Server")
                        .withTestResponse((status, setupInfo) -> {
                        })
        // end-ignore
        );

        // example-extract _matchers-state-vars-complete
        contract.runInteraction(
                new InteractionDefinition<>(
                        List.of(
                                new InStateWithVariables(
                                        "A user exists",
                                        Map.ofEntries(
                                                Map.entry("userId", "123")))),
                        WillSendHttpRequest.builder()
                                .request(
                                        HttpRequest.builder()
                                                .method("GET")
                                                .path("/users")
                                                // The StateVariable matcher tells ContractCase that
                                                // the id in the query will be the userId from the
                                                // state setup.
                                                .query(Map.of("id", new StateVariable("userId")))
                                                .build())
                                .response(HttpResponse.builder()
                                        .status(200)
                                        .body(
                                                Map.ofEntries(
                                                        // In the response body, we expect the
                                                        // userId to be the same as the one set up
                                                        // during state setup
                                                        Map.entry("id", new StateVariable("userId")),
                                                        // and the name may be any non-empty string
                                                        // (but during the contract definition, it will be "John Smith")
                                                        Map.entry("name", new AnyString("john smith"))))
                                        .build())
                                .build()),
                IndividualSuccessTestConfigBuilder.builder()
                        .withTrigger(
                                (interactionSetup) -> new YourApiClient(interactionSetup.getMockSetup("baseUrl"))
                                        .getUserQuery(interactionSetup.getStateVariable("userId")))
                        .withTestResponse(
                                (user, config) -> {
                                    assertThat(user).isEqualTo(new User("foo", "", List.of()));
                                }));
        // end-example

        contract.runInteraction(
                new InteractionDefinition<>(
                        List.of(
                                new InStateWithVariables(
                                        "A user exists",
                                        Map.ofEntries(
                                                Map.entry("userId", "123")))),
                        WillSendHttpRequest.builder()
                                .request(
                                        HttpRequest.builder()
                                                .method("GET")
                                                .path("/users")
                                                // The StateVariable matcher tells ContractCase that
                                                // the id in the query will be the userId from the
                                                // state setup.
                                                .query(Map.of("id", new StateVariable("userId")))
                                                .build())
                                .response(HttpResponse.builder()
                                        .status(200)
                                        .body(
                                                Map.ofEntries(
                                                        // In the response body, we expect the
                                                        // userId to be the same as the one set up
                                                        // during state setup
                                                        Map.entry("id", new StateVariable("userId")),
                                                        // and the name may be any non-empty string
                                                        // (but during the contract definition, it will be "John Smith")
                                                        Map.entry("name", new AnyString("john smith"))))
                                        .build())
                                .build()),
                // example-extract _trigger-http-client
                IndividualSuccessTestConfigBuilder.builder()
                        .withTrigger(
                                (interactionSetup) -> new YourApiClient(
                                        interactionSetup.getMockSetup("baseUrl")).getUserQuery(
                                                interactionSetup.getStateVariable("userId")))
                        // end-example
                        .withTestResponse(
                                (user, config) -> {
                                    assertThat(user).isEqualTo(new User("foo", "", List.of()));
                                })
                        .build());

    }
}
