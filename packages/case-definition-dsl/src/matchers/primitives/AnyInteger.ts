import { INTEGER_MATCH_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcherWithExample } from '../base';

/**
 * Matches any whole integer number.
 * @public
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
   * Matches any whole integer number.
   * @param example - Any floating point number, not infinity, not NaN.
   */
  constructor(example: number) {
    super(INTEGER_MATCH_TYPE, example);
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
