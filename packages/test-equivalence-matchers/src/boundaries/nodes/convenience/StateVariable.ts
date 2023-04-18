import { CONTEXT_VARIABLE_TYPE } from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';

/**
 * Matches the content of a variable that comes from a state. See [state
 * definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions)
 * and [state
 * handlers](https://case.contract-testing.io/docs/reference/state-handlers) for
 * more details.
 */
export class StateVariable extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof CONTEXT_VARIABLE_TYPE;

  /** @internal */
  readonly '_case:matcher:variableName': string;

  /**
   * @param name - The name of the variable
   */
  constructor(name: string) {
    super(CONTEXT_VARIABLE_TYPE);
    this['_case:matcher:variableName'] = name;
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
