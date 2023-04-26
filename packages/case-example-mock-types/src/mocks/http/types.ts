import { AnyMatcherOrData } from '@contract-case/test-equivalence-matchers';

export interface HttpExample {
  /**
   * A test equivalence matcher that will match an HTTP request (recommended: the Test Equivalence Matcher `HttpRequest`)
   */
  readonly request: AnyMatcherOrData;
  /**
   * A test equivalence matcher that will match an HTTP response (recommended: the Test Equivalence Matcher `HttpResponse`)
   */
  readonly response: AnyMatcherOrData;
}
