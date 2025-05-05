package io.contract_testing.contractcase.test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.contract_testing.contractcase.ContractDefiner;
import io.contract_testing.contractcase.InteractionDefinition;
import io.contract_testing.contractcase.configuration.ContractCaseConfig;
import io.contract_testing.contractcase.configuration.IndividualFailedTestConfig.IndividualFailedTestConfigBuilder;
import io.contract_testing.contractcase.configuration.IndividualSuccessTestConfig.IndividualSuccessTestConfigBuilder;
import io.contract_testing.contractcase.configuration.LogLevel;
import io.contract_testing.contractcase.configuration.PublishType;
import io.contract_testing.contractcase.configuration.Trigger;
import io.contract_testing.contractcase.definitions.interactions.http.HttpExample;
import io.contract_testing.contractcase.definitions.interactions.http.WillSendHttpRequest;
import io.contract_testing.contractcase.definitions.matchers.convenience.NamedMatch;
import io.contract_testing.contractcase.definitions.matchers.http.HttpRequest;
import io.contract_testing.contractcase.definitions.matchers.http.HttpRequestExample;
import io.contract_testing.contractcase.definitions.matchers.http.HttpResponse;
import io.contract_testing.contractcase.definitions.matchers.http.HttpResponseExample;
import io.contract_testing.contractcase.definitions.states.InState;
import io.contract_testing.contractcase.exceptions.ContractCaseConfigurationError;
import io.contract_testing.contractcase.exceptions.ContractCaseExpectationsNotMet;
import io.contract_testing.contractcase.exceptions.HasUserFacingStackTrace;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class FailingExampleTest {

  private static final ContractDefiner contract = new ContractDefiner(ContractCaseConfig.ContractCaseConfigBuilder.aContractCaseConfig()
      .consumerName("Java Example HTTP Client")
      .providerName("Java Example HTTP Server")
      .publish(PublishType.NEVER)
      //      .logLevel(LogLevel.MAINTAINER_DEBUG)
      .build());

  Trigger<String> getHealth = (setupInfo) -> {
    throw new RuntimeException("This is meant to fail");
  };


  @Test
  public void failingTrigger() {
    // failure in runInteraction trigger should return configuration error
    assertThatThrownBy(() -> {
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
    }).isInstanceOf(ContractCaseConfigurationError.class).satisfies((e) -> {
          assertThat(((HasUserFacingStackTrace) e).userFacingStackTrace())
              .contains("FailingExampleTest.java");
        }
    );
    ;
    // Failure in throwing interaction trigger should fail with verify error, as the
    // trigger's failure is passed to it
    assertThatThrownBy(() -> {
      contract.runThrowingInteraction(
          new InteractionDefinition<>(
              List.of(new InState("Server is broken")),
              new WillSendHttpRequest(HttpExample.builder()

                  .request(new NamedMatch(
                      "Get health",
                      new HttpRequest(HttpRequestExample.builder()
                          .path("/health")
                          .method("GET")
                          .build())
                  ))
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
    }).isInstanceOf(ContractCaseExpectationsNotMet.class)
        .satisfies((e) -> {
          assertThat(((HasUserFacingStackTrace) e).userFacingStackTrace())
              .contains("FailingExampleTest.java");
            }
        );

    // Recording contract should throw an error
    assertThatThrownBy(contract::endRecord).

        isInstanceOf(ContractCaseExpectationsNotMet.class).satisfies((e) -> {
              assertThat(((ContractCaseExpectationsNotMet) e).userFacingStackTrace()).isEqualTo(
                  "");
            }
        );
    ;

  }


}
