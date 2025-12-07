package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import java.util.List;
import javax.annotation.Generated;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches anything from a set of HTTP status codes.<p>This matcher accepts an array of strings.<p>This behaviour is provided so that you can offer flexibility to the
 * implementation if the code path for multiple status codes is exactly the
 * same. It is not appropriate to use multiple status codes if the code paths
 * are intended to be different. For more context, see
 * {&#64;link https://case.contract-testing.io/docs/faq#how-do-i-tell-contractcase-that-a-field-is-optional | the section on optional values in the documentation}
 * for more details<p>Like the HttpStatusCode matcher, you can relax matching with {@code X}, eg {@code "4XX"} or {@code "5XX"}, which is useful for covering error handling in contracts.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class HttpStatusCodes<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The status code to match
   */
  @Getter
  @JsonProperty("_case:matcher:rule")
  private final List<M> statusCodes;

  @Builder
  public HttpStatusCodes(@NotNull final List<M> statusCodes) {
    this.type = "_case:HttpStatusCode";
    this.statusCodes = statusCodes;
  }
}
