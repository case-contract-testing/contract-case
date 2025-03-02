/* eslint-disable max-classes-per-file */

/**
 * The base class for all Test Equivalence Matchers. Extend this if you don't
 * have an example in your Matcher. Otherwise, use `AnyMatcherWithExample`
 * @public
 */
export abstract class AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': string;

  /**
   * The base class for all Test Equivalence Matchers. Extend this if you don't
   * have an example in your Matcher. Otherwise, use {@link matchers.internals.AnyMatcherWithExample}
   * Matcher strings beginning with `_case:` are reserved for the default ContractCase
   * matchers.
   *
   * Only use a types prefixed with `_case:` if you wish to create a special case
   * for a matching behaviour that is already provided by a core ContractCase matcher.
   *
   * @param matcherType - The type string for this matcher (see {@link https://case.contract-testing.io/docs/reference/plugin-framework | Extending ContractCase} for a description of these strings).
   *
   */
  constructor(matcherType: string) {
    this['_case:matcher:type'] = matcherType;
  }

  /**
   * Only override this method if you are writing a matcher in a language other than TypeScript.
   *
   * It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.
   *
   * WARNING: Do not return a string from this method. You must instead return
   * an object that can be serialised to JSON following the matcher format
   * described in {@link https://case.contract-testing.io/docs/reference/plugin-framework | Extending ContractCase}.
   *
   * @returns An object in the matcher format described {@link https://case.contract-testing.io/docs/reference/plugin-framework | in the Extending ContractCase documentation}
   */
  toJSON(): unknown {
    return Object.entries(this).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key.startsWith('_') ? key : key]: value,
      }),
      {},
    );
  }
}

/**
 * The base class for all Test Equivalence Matchers that have examples provided.
 * Extend this if your matcher knows what the example will be. Otherwise, use `matchers.AnyMatcher`
 * @public
 */
export abstract class AnyMatcherWithExample extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:example': unknown;

  /**
   * The base class for all Test Equivalence Matchers that have examples provided.
   * Extend this if your matcher knows what the example will be. Otherwise, use `matchers.AnyMatcher`
   *
   * Only use a type prefixed with `_case:` if you wish to create a special case
   * for a matching behaviour that is already provided by a core ContractCase matcher.
   *
   * @param matcherType - The type string for this matcher (see {@link https://case.contract-testing.io/docs/reference/plugin-framework | Extending ContractCase} for a description of these strings).
   * @param example - The data that will be used as the example for this matcher
   */
  constructor(matcherType: string, example: unknown) {
    super(matcherType);
    this['_case:matcher:example'] = example;
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
