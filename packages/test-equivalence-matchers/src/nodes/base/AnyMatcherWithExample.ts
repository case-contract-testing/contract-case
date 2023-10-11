import { AnyMatcher } from './AnyMatcher';

/**
 * The base class for all Test Equivalence Matchers that have examples provided.
 * Extend this if your matcher knows what the example will be. Otherwise, use {@link @contract-case/test-equivalence-matchers#base.AnyMatcher}
 * @public
 */
export abstract class AnyMatcherWithExample extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:example': unknown;

  constructor(matcherType: string, example: unknown) {
    super(matcherType);
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
