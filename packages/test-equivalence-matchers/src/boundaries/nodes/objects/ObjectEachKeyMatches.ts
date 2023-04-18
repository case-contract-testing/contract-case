import { AnyMatcherOrData, OBJECT_KEYS_MATCH_TYPE } from '../../../entities';
import { AnyMatcher } from '../base';

/**
 * Matches an object where each key matches the provided matcher.
 */
export class ObjectEachKeyMatches extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof OBJECT_KEYS_MATCH_TYPE;

  /** @internal */
  readonly '_case:matcher:matcher': AnyMatcherOrData;

  /**
   * @param matcher - The matcher that all keys must pass
   */
  constructor(matcher: AnyMatcherOrData) {
    super(OBJECT_KEYS_MATCH_TYPE);

    this['_case:matcher:matcher'] = matcher;
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
