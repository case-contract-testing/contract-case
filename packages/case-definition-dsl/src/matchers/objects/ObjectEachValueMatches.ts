import { OBJECT_VALUES_MATCH_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../types';

/**
 * Matches an object where each value matches the provided matcher.
 * @public
 */
export class ObjectEachValueMatches extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof OBJECT_VALUES_MATCH_TYPE;

  /** @internal */
  readonly '_case:matcher:matcher': AnyMatcherOrData;

  /**
   * @param matcher - The matcher that all values must pass
   */
  constructor(matcher: AnyMatcherOrData) {
    super(OBJECT_VALUES_MATCH_TYPE);

    this['_case:matcher:matcher'] = matcher;
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
