package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import java.lang.String;
import javax.annotation.Generated;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Builder;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an HTTP request.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class HttpRequest<M> implements DslMatcher {

  /**
   * ContractCase's internal type for this element
   */
  @Getter
  @JsonProperty("_case:matcher:type")
  private final String type;

  /**
   * The HTTP method to match.<p>A string or string matcher that matches the method used for this example (eg {@code "GET"} or {@code "POST"}).<p>Case insensitive. Note that DELETE, GET and HEAD requests should not have bodies - see the HTTP RFCs for details.
   */
  @Getter
  @JsonProperty("method")
  private final M method;

  /**
   * The path to match. Provide a string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.
   */
  @Getter
  @JsonProperty("path")
  private final M path;

  /**
   * The query parameters to match.<p>Usually this is a dictionary object of query parameters,
   * keyed by parameter name, with the values being the query parameter value.<p>Note that by definition, all query parameters are strings..<p>Repeated parameters are collated and consolidated into an array. If you expect
   * repeated query parameters, provide a string for the parameter name, and an array for the expected values.
   * By default, this will match them in the order they appear in the query string.<p>If not provided, no query parameter matching is performed.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("query")
  private final M query;

  /**
   * A map of header names and associated test-equivalence matcher values
   * accepted by this example.<pre>{@code          If not provided, no header matching is performed
   * }</pre>
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("headers")
  private final M headers;

  /**
   * A dictionary object that describes the body for this response. If not provided, no body matching is performed.
   */
  @Nullable
  @JsonInclude(Include.NON_NULL)
  @Getter
  @JsonProperty("body")
  private final M body;

  @Builder
  public HttpRequest(@NotNull final M method, @NotNull final M path) {
    this.type = "_case:HttpRequestMatcher";
    this.method = method;
    this.path = path;
    this.query = null;
    this.headers = null;
    this.body = null;
  }

  @Builder
  public HttpRequest(
    @NotNull final M method,
    @NotNull final M path,
    @Nullable final M query,
    @Nullable final M headers,
    @Nullable final M body
  ) {
    this.type = "_case:HttpRequestMatcher";
    this.method = method;
    this.path = path;
    this.query = query;
    this.headers = headers;
    this.body = body;
  }
}
