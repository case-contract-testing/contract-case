import { SHAPED_ARRAY_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../types';

/**
 * Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.
 * @public
 */
export class ArrayStartsWith extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof SHAPED_ARRAY_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:children': Array<AnyMatcherOrData>;

  /**
   * Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.
   *
   * @param matchers -  An array of matchers that describes the start of the array. Additional elements in the actual array are ignored.
   */
  constructor(matchers: Array<AnyMatcherOrData>) {
    super(SHAPED_ARRAY_MATCHER_TYPE);
    this['_case:matcher:children'] = matchers;
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
