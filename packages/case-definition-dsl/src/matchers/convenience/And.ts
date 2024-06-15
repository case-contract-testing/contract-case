import { COMBINE_MATCHERS_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';
import { AnyMatcherOrData } from '../../types';

/**
 * Matches the content of a variable that comes from a state. See [state
 * definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
 * and [state
 * handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
 * more details.
 * @public
 */
export class And extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof COMBINE_MATCHERS_TYPE;

  /** @internal */
  readonly '_case:matcher:children': Array<AnyMatcherOrData>;

  /**
   * @param matchers - An array of the matchers to run against this particular spot in the tree
   */
  constructor(matchers: AnyMatcherOrData[]) {
    super(COMBINE_MATCHERS_TYPE);
    this['_case:matcher:children'] = matchers;
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
