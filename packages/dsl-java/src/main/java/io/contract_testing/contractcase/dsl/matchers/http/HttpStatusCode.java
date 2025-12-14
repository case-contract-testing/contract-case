package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an HTTP status code.<p>This takes a string, so that you can relax matching,
 * with {@code X}, eg {@code "4XX"} or {@code "5XX"}. This is useful for covering error handling in contracts.<p>If you need to match multiple specific statues, you can use the HttpStatusCodes matcher instead, which takes an array.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class HttpStatusCode implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * Constant parameter resolvesTo
   */
  @Getter
  @JsonProperty("_case:matcher:resolvesTo")
  private final String resolvesTo = "string";

  /**
   * The status code to match
   */
  @Getter
  @JsonProperty("_case:matcher:rule")
  private final Object statusCode;

  /**
   * Matches an HTTP status code.<p>This takes a string, so that you can relax matching,
   * with {@code X}, eg {@code "4XX"} or {@code "5XX"}. This is useful for covering error handling in contracts.<p>If you need to match multiple specific statues, you can use the HttpStatusCodes matcher instead, which takes an array.
   * @param statusCode The status code to match
   */
  @Builder
  public HttpStatusCode(@NotNull final Object statusCode) {
    this.type = "_case:HttpStatusCode";
    this.statusCode = statusCode;
  }
}
