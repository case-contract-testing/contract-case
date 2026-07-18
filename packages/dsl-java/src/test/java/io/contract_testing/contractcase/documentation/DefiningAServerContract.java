package io.contract_testing.contractcase.documentation;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig.ContractCaseConfigBuilder;
import io.contract_testing.contractcase.configuration.StateHandler;
import io.contract_testing.contractcase.dsl.interactions.http.WillReceiveHttpRequest;
import io.contract_testing.contractcase.dsl.matchers.http.HttpRequest;
import io.contract_testing.contractcase.dsl.matchers.http.HttpResponse;
import io.contract_testing.contractcase.dsl.matchers.http.HttpStatusCodes;
import io.contract_testing.contractcase.dsl.states.InState;
import java.util.List;
import java.util.Map;

public class DefiningAServerContract {

  private static final int port = 8099;

  // example-extract _http-server-config
  private static final ContractDefiner contract = new ContractDefiner(
      ContractCaseConfigBuilder.aContractCaseConfig()
          .consumerName("http request consumer")
          .providerName("http request provider")
          .mockConfig("http", Map.of(
              // Replace this with your own server URL
              "baseUrlUnderTest", "http://localhost:" + port))
          // State handlers are described below
          // ignore-extract
          .stateHandler(
              "Server is up",
              StateHandler.setupFunction(() -> {
              }))
          // end-ignore
          .build());
  // end-example

  public void testStateHandlers() {
    // example-extract _http-server-state-handlers
    ContractCaseConfigBuilder.aContractCaseConfig()
        .stateHandler(
            "Server is up",
            StateHandler.setupFunction(() -> {
              // Put your server into the 'Server is up' state here,
              // for example by mocking the repository layer
            }))
        .stateHandler(
            "Server is down",
            StateHandler.setupFunction(() -> {
              // Put your server into the 'Server is down' state here
            }))
        .stateHandler(
            "A user exists",
            StateHandler.setupAndTeardown(
                () -> {
                  // Set up the user in your server's repository layer,
                  // then return the userId as a state variable
                  return Map.of("userId", "42");
                },
                () -> {
                  // Remove the mock, so that the server state
                  // is the same as it was before the test
                }))
        // end-example
        .build();
  }

  public void testServerInteractions() {
    // example-extract _http-server-interactions
    contract.runInteraction(
        new InteractionDefinition<>(
            List.of(new InState("Server is up")),
            WillReceiveHttpRequest.builder()
                .request(HttpRequest.builder()
                    .method("GET")
                    .path("/health")
                    .headers(Map.of("accept", "application/json"))
                    .build())
                .response(HttpResponse.builder()
                    .status(200)
                    .body(Map.of("status", "up"))
                    .build())
                .build()));

    contract.runThrowingInteraction(
        new InteractionDefinition<>(
            List.of(new InState("Server is down")),
            WillReceiveHttpRequest.builder()
                .request(HttpRequest.builder()
                    .method("GET")
                    .path("/health")
                    .build())
                .response(HttpResponse.builder()
                    .status(new HttpStatusCodes(List.of("4XX", "5XX")))
                    .build())
                .build()));
    // end-example
  }
}
