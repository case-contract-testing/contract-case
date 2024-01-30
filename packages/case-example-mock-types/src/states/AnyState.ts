/**
 * The base class for all ContractCase State Descriptors. You shouldn't need to
 * extend this.
 *
 * You don't need to read the documentation for this class unless you are working
 * on a wrapper for ContractCase.
 *
 * @public
 */
export abstract class AnyState {
  /** @internal */
  readonly '_case:state:type': string;

  /** The name of this state, used to determine which state handler to run */
  readonly stateName: string;

  /**
   * Constructs a new state descriptor
   *
   * @param stateName - The name of the state used by this example. This must
   * match one of the state handlers provided in the configuration during the
   * example run.
   */
  constructor(stateType: string, stateName: string) {
    this['_case:state:type'] = stateType;
    this.stateName = stateName;
  }

  /**
   * You shouldn't need to override or call this method.
   *
   * It exists because the ContractCase matcher format is not legal in all languages that ContractCase supports.
   *
   * It isn't called by any implementation directly, it's used on the javascript side by `JSON.stringify()`.
   *
   * Calling it from a wrapper library will return unhelpful results, as JSii can't map all objects that it returns.
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

  /**
   * You shouldn't need to override this method. You don't need to call this
   * method, unless working on a wrapper for ContractCase.
   *
   * This method returns the entire state descriptor as a JSON string, as a convenience
   * so that wrapper libraries don't need to figure out how to walk a tree of example objects.
   *
   * @returns A JSON string representation of this state.
   */
  stringify(): string {
    return JSON.stringify(this);
  }
}
