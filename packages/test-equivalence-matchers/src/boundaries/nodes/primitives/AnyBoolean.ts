import { BOOLEAN_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcherWithExample } from '../base/AnyMatcherWithExample';

/**
 * Matches any Boolean.
 */
export class AnyBoolean extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof BOOLEAN_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:example': boolean;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'boolean';

  /** @internal */
  readonly '_case:context:matchBy' = 'type';

  /**
   * @param example - An example boolean
   */
  constructor(example: boolean) {
    super(BOOLEAN_MATCHER_TYPE, example);
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
