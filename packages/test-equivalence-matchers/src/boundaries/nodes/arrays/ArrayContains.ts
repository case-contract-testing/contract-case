import { ARRAY_CONTAINS_TYPE, AnyMatcherOrData } from '../../../entities';
import { AnyMatcher } from '../base';

/**
 * Matches an Array which contains elements that match the given matchers -
 * note that two different matchers may be satisfied by the same item in the array.
 */
export class ArrayContains extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof ARRAY_CONTAINS_TYPE;

  /** @internal */
  readonly '_case:matcher:matchers': Array<AnyMatcherOrData>;

  /**
   * @param matchers - any number of matchers, each of which must be found inside the array.
   */
  constructor(matchers: Array<AnyMatcherOrData>) {
    super(ARRAY_CONTAINS_TYPE);
    this['_case:matcher:matchers'] = matchers;
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
