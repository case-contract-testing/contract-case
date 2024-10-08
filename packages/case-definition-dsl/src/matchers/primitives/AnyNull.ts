import { NULL_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcherWithExample } from '../base';

/**
 * Matches `null` (useful for languages like Java where `body: null` means no
 * body, but you want to match a eg a json document that has the body `"null"`).
 * @public
 */
export class AnyNull extends AnyMatcherWithExample {
  /** @internal */
  readonly '_case:matcher:type': typeof NULL_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:example': null;

  /** @internal */
  readonly '_case:matcher:resolvesTo' = 'null';

  /** @internal */
  readonly '_case:context:matchBy' = 'type';

  /**
   * Matches `null` (useful for languages like Java where `body: null` means no
   * body, but you want to match a eg a json document that has the body `"null"`).
   *
   * @param example - Any floating point number, not infinity, not NaN.
   */
  constructor() {
    super(NULL_MATCHER_TYPE, null);
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
