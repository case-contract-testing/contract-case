import { AnyMatcherOrData } from '../../types';
import { CascadingContextMatcher } from '../base';

/**
 * Everything inside this matcher will be matched on the shape of the data (ie,
 * type alone), unless overridden with other matchers.  Use this to switch out
 * of the default `exactlyLike` matching.
 * @public
 */
export class ShapedLike extends CascadingContextMatcher {
  /**
   * Everything inside this matcher will be matched on the shape of the data (ie,
   * type alone), unless overridden with other matchers.  Use this to switch out
   * of the default `exactlyLike` matching.
   *
   * @param content - The object, array, primitive or matcher to match the shape against
   */
  constructor(content: AnyMatcherOrData) {
    super(content, { matchBy: 'type' }, {});
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
