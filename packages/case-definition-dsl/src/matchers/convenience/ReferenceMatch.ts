import { LOOKUP_MATCHER_TYPE } from '@contract-case/case-plugin-base';
import { AnyMatcher } from '../base';

/**
 * Matches a named matcher created with `NamedMatch`.
 * @public
 */
export class ReferenceMatch extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:uniqueName': string;

  /**
   * @param name - The name you gave to a previous call of `NamedMatch`
   */
  constructor(name: string) {
    super(LOOKUP_MATCHER_TYPE);
    this['_case:matcher:uniqueName'] = name;
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
