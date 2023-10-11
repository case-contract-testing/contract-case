/* eslint-disable max-classes-per-file */
/**
 * The base class for all Test Equivalence Matchers. Extend this if you don't
 * have an example in your Matcher. Otherwise, use {@link @contract-case/test-equivalence-matchers#base.AnyMatcherWithExample}
 * @public
 */
export abstract class AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': string;

  /**
   * @param matcherType - The type string for this matcher (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings).
   *
   * Matcher strings beginning with `_case:` are reserved for the default ContractCase
   * matchers. Only use a types prefixed with `_case:` if you wish to create a special case
   * for a matching behaviour that is already provided by a core ContractCase matcher.
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
   * described in [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case).
   *
   * @returns An object in the matcher format described [in the Extending ContractCase documentation](https://case.contract-testing.io/docs/advanced-topics/extending-case).
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
 * Extend this if your matcher knows what the example will be. Otherwise, use {@link @contract-case/test-equivalence-matchers#base.AnyMatcher}
 * @public
 */
export abstract class AnyMatcherWithExample extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:example': unknown;

  constructor(matcherType: string, example: unknown) {
    super(matcherType);
    this['_case:matcher:example'] = example;
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
