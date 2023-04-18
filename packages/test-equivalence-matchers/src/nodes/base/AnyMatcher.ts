/**
 * The base class for all Test Equivalence Matchers. Extend this if you don't
 * have an example in your Matcher. Otherwise, use {@link AnyMatcherWithExample}
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
   * Only override this method if you are writing a matcher from a language other than TypeScript.
   *
   * It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.
   *
   * WARNING: Do not return a string from this method. You must instead return
   * an object that can be serialised to JSON following  matcher format
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
      {}
    );
  }
}
