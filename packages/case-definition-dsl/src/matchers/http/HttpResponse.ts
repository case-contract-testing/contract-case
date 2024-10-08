import { HTTP_RESPONSE_MATCHER_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../types';

/**
 * @public
 */
export interface HttpResponseExample {
  /* Any test-equivalence matcher or string or number for the HTTP status code accepted by this example (Recommended: `HttpStatusCode`) */
  readonly status: AnyMatcherOrData;

  /** What unique name, if any, to give to this response */
  readonly uniqueName?: string;
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
 * Matches any HTTP Response with the provided properties
 * @public
 */
export class HttpResponse extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof HTTP_RESPONSE_MATCHER_TYPE;

  readonly uniqueName?: string;

  readonly status: AnyMatcherOrData;

  readonly headers?: AnyMatcherOrData;

  readonly body?: AnyMatcherOrData;

  /**
   * Matches any HTTP Response with the provided properties
   * @param responseExample - An HttpResponseExample that describes the response
   */
  constructor(responseExample: HttpResponseExample) {
    super(HTTP_RESPONSE_MATCHER_TYPE);
    this.status = responseExample.status;
    if (responseExample.uniqueName !== undefined) {
      this.uniqueName = responseExample.uniqueName;
    }
    if (responseExample.headers !== undefined) {
      this.headers = responseExample.headers;
    }
    if (responseExample.body !== undefined) {
      this.body = responseExample.body;
    }
  }

  /**
   * For non-TypeScript implementations (see `AnyMatcher.toJSON`)
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
