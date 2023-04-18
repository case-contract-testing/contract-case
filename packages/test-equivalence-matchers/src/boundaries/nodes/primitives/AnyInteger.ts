import { INTEGER_MATCH_TYPE } from '../../../entities/matchers.types';
import { AnyMatcherWithExample } from '../base/AnyMatcherWithExample';

/**
 * Matches any whole integer number.
 */
export class AnyInteger extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof INTEGER_MATCH_TYPE;

  /** @internal */
  readonly '_case:matcher:example': number;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'number';

  /** @internal */
  readonly '_case:context:matchBy' = 'type';

  /**
   * @param example - Any floating point number, not infinity, not NaN.
   */
  constructor(example: number) {
    super(INTEGER_MATCH_TYPE, example);
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
