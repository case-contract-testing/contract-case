package io.contract_testing.contractcase.documentation;

import io.contract_testing.contractcase.ContractCaseConfig;
import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.ExampleDefinition;
import io.contract_testing.contractcase.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.LogLevel;
import io.contract_testing.contractcase.Trigger;
import io.contract_testing.contractcase.case_example_mock_types.mocks.http.HttpExample;
import io.contract_testing.contractcase.case_example_mock_types.mocks.http.WillSendHttpRequest;
import io.contract_testing.contractcase.case_example_mock_types.states.InState;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpRequest;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpRequestExample;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpResponse;
import io.contract_testing.contractcase.test_equivalence_matchers.http.HttpResponseExample;
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
    contract.runExample(
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
                            Map.entry("status", "up"),
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
    contract.runExample(
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
  }


}
