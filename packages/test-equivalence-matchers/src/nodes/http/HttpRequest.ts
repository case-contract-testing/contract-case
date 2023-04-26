import { HTTP_REQUEST_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData, AnyStringMatcher } from '../../types';

export interface HttpRequestExample {
  /**
   * A string or string matcher that matches the method used for this example
   * (eg `"GET"` or `"POST"`). Case insensitive. Note that DELETE, GET and HEAD
   * requests should not have bodies - see the HTTP RFCs for details.
   */
  readonly method: AnyStringMatcher;

  /**
   * A string or string matcher that matches the path of this example. Note that any query parameters must be in the query, not in the path.
   */
  readonly path: AnyStringMatcher;

  /** What unique name, if any, to give to this request */
  readonly uniqueName?: string;

  /**
   * A test-equivalence matcher for the query. Usually this is a Map of
   * test-equivalence matchers to match the parsed query string, keyed by
   * parameter name. Repeated parameters are collated and put in an
   * array in this map.
   */
  readonly query?: AnyMatcherOrData;

  /**
   * A Map of header names and associated test-equivalence matcher values
   * accepted by this example. If not provided, no header matching is performed */
  readonly headers?: AnyMatcherOrData;

  /**
   * A test equivalence matcher or json object that describes the body for this response. If not provided, no body matching is performed.
   */
  readonly body?: AnyMatcherOrData;
}

/**
 * Matches any HTTP Request with the provided properties
 */
export class HttpRequest extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof HTTP_REQUEST_MATCHER_TYPE;

  readonly method: AnyStringMatcher;

  readonly path: AnyStringMatcher;

  readonly uniqueName?: string;

  readonly query?: AnyMatcherOrData;

  readonly headers?: AnyMatcherOrData;

  readonly body?: AnyMatcherOrData;

  /**
   * @param requestExample - An HttpResponseExample that describes the response
   */
  constructor(requestExample: HttpRequestExample) {
    super(HTTP_REQUEST_MATCHER_TYPE);
    this.path = requestExample.path;
    this.method = requestExample.method;

    if (requestExample.uniqueName !== undefined) {
      this.uniqueName = requestExample.uniqueName;
    }
    if (requestExample.query !== undefined) {
      this.query = requestExample.query;
    }
    if (requestExample.headers !== undefined) {
      this.headers = requestExample.headers;
    }
    if (requestExample.body !== undefined) {
      this.body = requestExample.body;
    }
  }

  /**
   * For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON))
   *
   * @privateRemarks
   * This comment and the implementation is boilerplate on all matchers to avoid
   * outputting duplicate unimportant documentation on all matcher classes of
   * the docs. Only modify this comment or the implementation via search and replace.
   */
  override toJSON(): unknown {
    return super.toJSON();
  }
}
