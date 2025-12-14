package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an HTTP response.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class HttpResponse implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The HTTP status code accepted by this example (Recommended: Use the HttpStatusCode matcher)
   */
  @Getter
  @JsonProperty("status")
  private final Object status;

  /**
   * A dictionary object of header names and associated test-equivalence matcher values
   * accepted by this example.<p>If not provided, no header matching is performed
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("headers")
  private final Object headers;

  /**
   * A dictionary object that describes the body for this response. If not provided, no body matching is performed.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("body")
  private final Object body;

  @Builder
  public HttpResponse(
    @NotNull final Object status,
    @Nullable final Object headers,
    @Nullable final Object body
  ) {
    this.type = "_case:HttpResponseMatcher";
    this.status = status;
    this.headers = headers;
    this.body = body;
  }
}
