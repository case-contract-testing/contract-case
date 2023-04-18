import { AnyStringMatcher } from '../../types';
import { StringPrefix } from '../strings';

/**
 * Matches the value part of a OIDC or OAuth header with the supplied token - useful in conjunction with the StateVariable matcher
 *
 */
export class BearerTokenHeaderValue extends StringPrefix {
  /**
   * @param token - A string or string matcher for a Bearer auth token
   */
  constructor(token: AnyStringMatcher) {
    super('Bearer ', token);
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
