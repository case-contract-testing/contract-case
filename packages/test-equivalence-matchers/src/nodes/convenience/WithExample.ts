import { AnyMatcherOrData } from '../../types';
import { CascadingContextMatcher } from '../base';

/**
 * Adds an example to the provided matcher. Useful when you have a complicated
 * set of constraints and ContractCase can't figure out what the best example should be.
 *
 * Note that providing any example will override examples provided further down the tree.
 */
export class WithExample extends CascadingContextMatcher {
  /** @internal */
  readonly '_case:matcher:example': AnyMatcherOrData;

  /**
   * @param matcher - Any matcher to add an example to
   * @param example - The example to use when stripping the matchers
   */
  constructor(matcher: AnyMatcherOrData, example: AnyMatcherOrData) {
    super(matcher, {}, {});
    this['_case:matcher:example'] = example;
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
