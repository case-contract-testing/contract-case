import { STRING_CONTAINS_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcherWithExample } from '../base';

/**
 * Matches any string that contains the given substring.
 * @public
 */
export class StringContaining extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof STRING_CONTAINS_TYPE;

  /** @internal */
  readonly '_case:matcher:contains': string;

  /** @internal */
  readonly '_case:matcher:example': string;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'string';

  /**
   * Matches any string that contains the given substring.
   * @param substring - The substring that the matcher must contain
   * @param example - An example string that passes this matcher
   */
  constructor(substring: string, example: string) {
    super(STRING_CONTAINS_TYPE, example);
    this['_case:matcher:contains'] = substring;
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
