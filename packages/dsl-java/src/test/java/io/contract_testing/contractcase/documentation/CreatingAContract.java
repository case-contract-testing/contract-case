package io.contract_testing.contractcase.documentation;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.Trigger;
import io.contract_testing.contractcase.case_example_mock_types.mocks.http.HttpExample;
import io.contract_testing.contractcase.case_example_mock_types.mocks.http.WillSendHttpRequest;
import io.contract_testing.contractcase.case_example_mock_types.states.InState;
import io.contract_testing.contractcase.test_equivalence_matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpRequest;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpRequestExample;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpResponse;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpResponseExample;
import java.util.List;
import java.util.Map;

public class CreatingAContract {

  Trigger<String> getHealth = (setupInfo) -> {
    return ""; /* new ApiClient(setupInfo.getInfo("baseUrl")).getHealth(); */
  };

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
            .withTrigger(getHealth)
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
            .withTrigger(getHealth)
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
  }
  // end-example

}
