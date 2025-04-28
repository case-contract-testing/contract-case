package io.contract_testing.contractcase.test.httpclient;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.Trigger;
import io.contract_testing.contractcase.definitions.interactions.http.HttpExample;
import io.contract_testing.contractcase.definitions.interactions.http.WillSendHttpRequest;
import io.contract_testing.contractcase.definitions.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.convenience.StateVariable;
import io.contract_testing.contractcase.definitions.matchers.http.HttpRequest;
import io.contract_testing.contractcase.definitions.matchers.http.HttpRequestExample;
import io.contract_testing.contractcase.definitions.matchers.http.HttpResponse;
import io.contract_testing.contractcase.definitions.matchers.http.HttpResponseExample;
import io.contract_testing.contractcase.definitions.matchers.strings.StringPrefix;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.test.httpclient.implementation.YourApiClient;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class RewriteFailureTest {

  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Example HTTP Client")
      .providerName("Java Example HTTP Server")
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
  public void failsWhenTryingToOverwrite() {
    contract.runInteraction(
        new InteractionDefinition<>(
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

    assertThatThrownBy(contract::endRecord).matches((t) -> {
      assertThat(t).isInstanceOf(ContractCaseConfigurationError.class);
      assertThat(((ContractCaseConfigurationError) t).getErrorCode()).isEqualTo("OVERWRITE_CONTRACTS_NEEDED");
      return true;
    });
  }


}