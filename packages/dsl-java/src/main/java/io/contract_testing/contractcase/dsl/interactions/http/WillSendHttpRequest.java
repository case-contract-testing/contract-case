package io.contract_testing.contractcase.dsl.interactions.http;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslInteraction;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Defines an example that expects to send an HTTP response. Use this to define a contract at an HTTP server.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class WillSendHttpRequest implements DslInteraction {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:mock:type")
  private final String type;

  /**
   * Internal boilerplate that determines behaviour during definition (write) and verification (read)
   */
  @Getter
  @JsonProperty("_case:run:context:setup")
  private final Object setup = Map.ofEntries(
    Map.entry(
      "write",
      Map.ofEntries(
        Map.entry("type", "_case:MockHttpServer"),
        Map.entry("stateVariables", "default"),
        Map.entry("triggers", "provided")
      )
    ),
    Map.entry(
      "read",
      Map.ofEntries(
        Map.entry("type", "_case:MockHttpClient"),
        Map.entry("stateVariables", "state"),
        Map.entry("triggers", "generated")
      )
    )
  );

  /**
   * A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher {@code HttpRequest})
   */
  @Getter
  @JsonProperty("request")
  private final Object request;

  /**
   * A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher {@code HttpResponse})
   */
  @Getter
  @JsonProperty("response")
  private final Object response;

  @Builder
  public WillSendHttpRequest(
    @NotNull final Object request,
    @NotNull final Object response
  ) {
    this.type = "_case:MockHttpServer";
    this.request = request;
    this.response = response;
  }
}
