import { LOOKUP_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../../types';

/**
 * Saves the matcher below it with a unique name that can be used with lookups
 * in tests after this one.
 */
export class NamedMatch extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:uniqueName': string;

  /** @internal */
  readonly '_case:matcher:child': AnyMatcherOrData | undefined;

  /**
   * @param name - The name you can use to lookup this matcher later
   * @param child - The content of this named match. If omitted or undefined, the content will be looked up in a previously named match
   */
  constructor(name: string, child: AnyMatcherOrData) {
    super(LOOKUP_MATCHER_TYPE);
    this['_case:matcher:uniqueName'] = name;
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
