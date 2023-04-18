import { coreBasicAuthValue } from '@contract-case/case-entities-internal';
import { StringPrefix } from '../strings';
import { AnyStringMatcher } from '../../types';

/**
 * Matches the value part of a basic auth header with the supplied username and password - useful in conjunction with the StateVariable matcher
 *
 */
export class BasicAuthHeaderValue extends StringPrefix {
  /**
   * @param username - The username for this basic auth header
   * @param password - The password for this basic auth password
   */
  constructor(username: AnyStringMatcher, password: AnyStringMatcher) {
    super('Basic ', coreBasicAuthValue(username, password));
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
