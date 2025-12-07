import { URL_ENCODED_STRING_TYPE } from '@contract-case/case-core-plugin-http-dsl';
import { AnyMatcher } from '../base';
import { AnyStringMatcher } from '../../types';

/**
 * Convenience matcher to treat the string as a uri encoded string - useful in `path` segments.
 *
 * During matching, the actual value is decoded with `decodeUriComponent()` and passed to the child matcher.
 * @public
 */
export class UriEncodedString extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof URL_ENCODED_STRING_TYPE;

  /** @internal */
  readonly '_case:matcher:child': AnyStringMatcher;

  // TODO: The `accepts` concept is unused, we should remove it
  /** @internal */
  readonly '_case:matcher:accepts' = 'string';

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'string';

  /**
   * Convenience matcher to treat the string as a uri encoded string - useful in `path` segments.
   *
   * During matching, the actual value is decoded with `decodeUriComponent()` and passed to the child matcher.
   * @param child - Any string matcher or literal string
   */
  constructor(child: AnyStringMatcher) {
    super(URL_ENCODED_STRING_TYPE);
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
