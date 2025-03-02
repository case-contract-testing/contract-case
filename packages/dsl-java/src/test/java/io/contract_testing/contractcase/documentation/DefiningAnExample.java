package io.contract_testing.contractcase.documentation;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.Trigger;

import io.contract_testing.contractcase.definitions.matchers.AnyString;
import io.contract_testing.contractcase.definitions.matchers.HttpRequest;
import io.contract_testing.contractcase.definitions.matchers.HttpRequestExample;
import io.contract_testing.contractcase.definitions.matchers.HttpResponse;
import io.contract_testing.contractcase.definitions.matchers.HttpResponseExample;
import io.contract_testing.contractcase.definitions.matchers.StateVariable;
import io.contract_testing.contractcase.definitions.matchers.StringPrefix;
import io.contract_testing.contractcase.definitions.mocks.http.HttpExample;
import io.contract_testing.contractcase.definitions.mocks.http.WillSendHttpRequest;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.definitions.states.InStateWithVariables;
import java.util.List;
import java.util.Map;

public class DefiningAnExample {

  Trigger<String> getHealth = (setupInfo) -> {
    return ""; /* new ApiClient(setupInfo.getInfo("baseUrl")).getHealth(); */
  };

  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("Example-Client")
          .providerName("Example-Server")
          .build());


  public void testGetUser() {
    // example-extract _defining-an-example-states
    contract.runInteraction(
        new ExampleDefinition<>(
            List.of(
                new InState("Server is up"),
                new InState("A user with id \"foo\" exists")
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
                        Map.ofEntries(
                            Map.entry("userId", "foo"),
                            Map.entry("name", "john smith")
                        )
                    )
                    .build()))
                .build())
        ),
        // ignore-extract
        IndividualSuccessTestConfigBuilder.<String>builder()
            .withProviderName("Java Example HTTP Server")
            .withTrigger(getHealth)
            .withTestResponse((status, setupInfo) -> {
            })
        // end-ignore
    );
    // end-example
  }

  public void testConfig() {
    // example-extract _defining-an-example-config
    contract.runInteraction(
        new ExampleDefinition<>(
            List.of(
                /* as above */
                // ignore-extract
                new InState("Server is up"),
                new InState("A user with id \"foo\" exists")
                // end-ignore
            ),
            new WillSendHttpRequest(
                HttpExample.builder()
                    /* as above */
                    // ignore-extract
                    .request(
                        new HttpRequest(HttpRequestExample.builder()
                            .method("GET")
                            .path("/users/foo")
                            .build())
                    )
                    .response(new HttpResponse(HttpResponseExample.builder()
                        .status(200)
                        .body(
                            Map.ofEntries(
                                Map.entry("status", "up"),
                                Map.entry("name", "john smith")
                            )
                        )
                        .build()))
                    // end-ignore
                    .build())
        ),
        IndividualSuccessTestConfigBuilder.builder()
            .withLogLevel(LogLevel.DEBUG)
            .build()
    );
    // end-example

    contract.runInteraction(
        new ExampleDefinition<>(
            List.of(
                /* as above */
                // example-extract _defining-states
                new InState("Server is up"),
                new InState("A user with id \"foo\" exists")
                // end-example
            ),
            new WillSendHttpRequest(
                HttpExample.builder()
                    /* as above */
                    // ignore-extract
                    .request(
                        new HttpRequest(HttpRequestExample.builder()
                            .method("GET")
                            .path("/users/foo")
                            .build())
                    )
                    .response(new HttpResponse(HttpResponseExample.builder()
                        .status(200)
                        .body(
                            Map.ofEntries(
                                Map.entry("status", "up"),
                                Map.entry("name", "john smith")
                            )
                        )
                        .build()))
                    // end-ignore
                    .build())
        ),
        IndividualSuccessTestConfigBuilder.builder()
            .withLogLevel(LogLevel.DEBUG)
            .build()
    );

    // example-extract _defining-states-order
    contract.runInteraction(
        new ExampleDefinition<>(
            List.of(
                // This one runs first
                new InState("Server is up"),
                // This one runs second
                new InState("A user with id \"foo\" exists")
            ),
            /* ... */
            // ignore-extract
            new WillSendHttpRequest(
                HttpExample.builder()
                    .request(
                        new HttpRequest(HttpRequestExample.builder()
                            .method("GET")
                            .path("/users/foo")
                            .build())
                    )
                    .response(new HttpResponse(HttpResponseExample.builder()
                        .status(200)
                        .body(
                            Map.ofEntries(
                                Map.entry("status", "up"),
                                Map.entry("name", "john smith")
                            )
                        )
                        .build()))

                    .build())

        ),
        IndividualSuccessTestConfigBuilder.builder()
            .withLogLevel(LogLevel.DEBUG)
            .build()
        // end-ignore
    );
    // end-example

    // example-extract _state-variables
    new InStateWithVariables("A user exists", Map.of("userId", "foo"));
    // end-example

    // example-extract _state-matchers
    contract.runInteraction(
        new ExampleDefinition<>(
            List.of(
                new InState("Server is up"),
                new InStateWithVariables(
                    "A user exists",
                    Map.of("userId", "123")
                )
            ),
            new WillSendHttpRequest(
                HttpExample.builder()
                    .request(
                        new HttpRequest(HttpRequestExample.builder()
                            .method("GET")
                            .path(
                                new StringPrefix(
                                    "/users",
                                    new StateVariable("userId")
                                )
                            ).build()
                        )
                    )
                    .response(new HttpResponse(HttpResponseExample.builder()
                        .status(200)
                        .body(
                            Map.ofEntries(
                                Map.entry("userId", new StateVariable("userId")),
                                Map.entry("name", new AnyString("john smith"))
                            )
                        )
                        .build()))
                    .build())
        ),
        /* ... */
        // ignore-extract
        IndividualSuccessTestConfigBuilder.builder()
            .withLogLevel(LogLevel.DEBUG)
            .build()
        // end-ignore
    );
    // end-example
  }

  // example-extract _end-record
  // annotate with @AfterAll if using JUnit
  static void after() {
    contract.endRecord();
  }
  // end-example

}
