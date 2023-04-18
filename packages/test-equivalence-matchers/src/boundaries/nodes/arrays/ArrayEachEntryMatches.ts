import {
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  AnyMatcherOrData,
} from '../../../entities';
import { AnyMatcher } from '../base';

/**
 * Matches an array where each element matches the provided matcher.
 *
 */
export class ArrayEachEntryMatches extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof ARRAY_EACH_ENTRY_MATCHES_TYPE;

  /** @internal */
  readonly '_case:matcher:matcher': AnyMatcherOrData;

  /**
   * @param matcher - The matcher for each entry in the array
   * @param example - An optional example of the whole array to return
   */
  constructor(matcher: AnyMatcherOrData) {
    super(ARRAY_EACH_ENTRY_MATCHES_TYPE);
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
