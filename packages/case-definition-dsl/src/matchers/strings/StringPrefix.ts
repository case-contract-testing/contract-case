import { STRING_PREFIX_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyString } from './AnyString';
import { AnyStringMatcher } from '../../types';
import type {} from './StringSuffix';

/**
 * Matches any string that begins with the given constant string prefix, and ends with a
 * matchable suffix.
 *
 * At match time, the actual string is checked for the constant prefix, and then
 * the rest of the string is passed to the suffix matcher..
 *
 * The suffix matcher must be expecting a string.
 *
 * See also {@link matchers.strings.StringSuffix | StringSuffix}
 *
 * @public
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
   * Matches any string that begins with the given constant string prefix, and ends with a
   * matchable suffix.
   *
   * At match time, the actual string is checked for the constant prefix, and then
   * the rest of the string is passed to the suffix matcher..
   *
   * The suffix matcher must be expecting a string.
   *
   * See also {@link matchers.strings.StringSuffix | StringSuffix}
   *
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
