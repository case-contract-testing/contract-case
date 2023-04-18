import { AnyMatcherOrData } from '../../types';
import { CascadingContextMatcher } from '../base';

/**
 * Everything inside this matcher will be matched exactly, unless overridden
 * with a generic matcher (eg `AnyString` or` ShapedLike`). Use this to switch
 * out of `shapedLike` and back to the default exact matching.
 */
export class ExactlyLike extends CascadingContextMatcher {
  /**
   * @param content - The object, array, primitive or matcher to match exactly
   */
  constructor(content: AnyMatcherOrData) {
    super(content, { matchBy: 'exact' }, {});
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
