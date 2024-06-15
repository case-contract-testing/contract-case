import { JSON_STRINGIFIED_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../types';

/**
 * Transformation matcher that matches a JSON.stringify()ed version of the given
 * object.
 *
 * For example, if the actual data is the string:
 *
 * ```
 * "{\"foo\":2}"
 * ```
 *
 * then you could match it with:
 *
 * ```
 * StringifiedJson({
 *   "foo": 2
 * })
 * ```
 *
 * or
 *
 * ```
 * StringifiedJson({
 *   "foo": AnyNumber(2)
 * })
 * ```
 * @public
 */
export class StringifiedJson extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof JSON_STRINGIFIED_TYPE;

  /** @internal */
  readonly '_case:matcher:child': AnyMatcherOrData;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'string';

  /**
   *
   * @param child - The object or matcher that matches the decoded
   */
  constructor(child: AnyMatcherOrData) {
    super(JSON_STRINGIFIED_TYPE);
    this['_case:matcher:child'] = child;
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
