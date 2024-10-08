import { STRING_SUFFIX_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyString } from './AnyString';
import { AnyStringMatcher } from '../../types';

/**
 * Matches any string that begins with a matchable prefix, and ends with a
 * constant suffix.
 *
 * At match time, the actual string is checked for the expected constant suffix,
 * and then the beginning of the string is passed to the prefix matcher.
 *
 * The prefix matcher must be expecting a string.
 *
 * See also {@link matchers.strings.StringPrefix | StringPrefix}
 * @public
 */
export class StringSuffix extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof STRING_SUFFIX_TYPE;

  /** @internal */
  readonly '_case:matcher:prefix': string | AnyStringMatcher;

  /** @internal */
  readonly '_case:matcher:suffix': string;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'string';

  /**
   * @param prefix - A string or matcher to match against the prefix. If you don't mind what the prefix is, pass null / undefined
   * @param suffix - The suffix for the matched string. Must be a string and not a matcher
   */
  constructor(prefix: AnyStringMatcher, suffix: string) {
    super(STRING_SUFFIX_TYPE);

    this['_case:matcher:suffix'] = suffix;
    this['_case:matcher:prefix'] =
      prefix != null ? prefix : new AnyString('any-prefix');
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
