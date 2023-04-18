import { AnyMatcherOrData, BASE64_ENCODED_TYPE } from '../../../entities';
import { AnyMatcher } from '../base';

/**
 * Transformation matcher that matches a base64 encoded version of the given string or string matcher
 *
 * WARNING: Since many strings are accidentally decodable as base64, this matcher is
 * best combined with a more restrictive string matcher (eg `StringifiedJson`).
 */
export class Base64Encoded extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof BASE64_ENCODED_TYPE;

  /** @internal */
  readonly '_case:matcher:child': AnyMatcherOrData;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'string';

  /**
   * WARNING: Since many strings are accidentally decodable as base64, this matcher is
   * best combined with a more restrictive string matcher (eg `StringifiedJson`).
   *
   * @param child - The string or string matcher that would match the decoded string
   */
  constructor(child: AnyMatcherOrData) {
    super(BASE64_ENCODED_TYPE);
    this['_case:matcher:child'] = child;
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
