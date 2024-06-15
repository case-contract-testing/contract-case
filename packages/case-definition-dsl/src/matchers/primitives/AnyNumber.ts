import { NUMBER_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcherWithExample } from '../base';

/**
 * Matches a number following [RFC 8259 JSON](https://www.rfc-editor.org/rfc/rfc8259).
 * @public
 */
export class AnyNumber extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof NUMBER_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:example': number;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'number';

  /** @internal */
  readonly '_case:context:matchBy' = 'type';

  /**
   * @param example - An example number
   */
  constructor(example: number) {
    super(NUMBER_MATCHER_TYPE, example);
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
