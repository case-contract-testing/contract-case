package io.contract_testing.contractcase.dsl.matchers.http;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.contract_testing.contractcase.dsl.ContractCaseDsl;
import io.contract_testing.contractcase.dsl.DslMatcher;
import jakarta.annotation.Generated;
import java.lang.Object;
import java.lang.String;
import javax.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

/**
 * Matches an HTTP request.
 */
@Generated("@contract-case/case-definition-generator")
@ContractCaseDsl
public class HttpRequest implements DslMatcher {

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
  private final Object method;

  /**
   * The path to match. Provide a string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.
   */
  @Getter
  @JsonProperty("path")
  private final Object path;

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
  private final Object query;

  /**
   * A map of header names and associated test-equivalence matcher values
   * accepted by this example.<pre>{@code          If not provided, no header matching is performed
   * }</pre>
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

  /**
     * Matches an HTTP request.
     * @param method The HTTP method to match.

A string or string matcher that matches the method used for this example (eg `"GET"` or `"POST"`). 
           
Case insensitive. Note that DELETE, GET and HEAD requests should not have bodies - see the HTTP RFCs for details.
          
     * @param path The path to match. Provide a string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.
     * @param query The query parameters to match.
            
   Usually this is a dictionary object of query parameters,
   keyed by parameter name, with the values being the query parameter value.
   
   Note that by definition, all query parameters are strings.. 
   
   Repeated parameters are collated and consolidated into an array. If you expect 
   repeated query parameters, provide a string for the parameter name, and an array for the expected values. 
   By default, this will match them in the order they appear in the query string.

   If not provided, no query parameter matching is performed.
          
     * @param headers A map of header names and associated test-equivalence matcher values
             accepted by this example.
             
             If not provided, no header matching is performed
     * @param body A dictionary object that describes the body for this response. If not provided, no body matching is performed.
     */
  @Builder
  public HttpRequest(
    @NotNull final Object method,
    @NotNull final Object path,
    @Nullable final Object query,
    @Nullable final Object headers,
    @Nullable final Object body
  ) {
    this.type = "_case:HttpRequestMatcher";
    this.method = method;
    this.path = path;
    this.query = query;
    this.headers = headers;
    this.body = body;
  }
}
