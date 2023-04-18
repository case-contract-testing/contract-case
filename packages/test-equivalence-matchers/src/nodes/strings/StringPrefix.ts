import { STRING_PREFIX_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyString } from './AnyString';
import { AnyStringMatcher } from '../../types';

/**
 * Matches any string that begins with the given constant string prefix
 */
export class StringPrefix extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof STRING_PREFIX_TYPE;

  /** @internal */
  readonly '_case:matcher:prefix': string;

  /** @internal */
  readonly '_case:matcher:suffix': AnyStringMatcher;

  /** @internal */
  readonly '_case:matcher:resolvesTo': 'string';

  /**
   * @param prefix - The prefix string. Must be a string and not a matcher
   * @param suffix - A string or matcher to match against the suffix.
   */
  constructor(prefix: string, suffix: AnyStringMatcher) {
    super(STRING_PREFIX_TYPE);

    this['_case:matcher:prefix'] = prefix;
    this['_case:matcher:suffix'] =
      suffix != null ? suffix : new AnyString('any-suffix');
    this['_case:matcher:resolvesTo'] = 'string';
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
