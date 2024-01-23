import { SETUP_VARIABLE_STATE } from '@contract-case/case-entities-internal';
import { AnyMatcherOrData } from '@contract-case/test-equivalence-matchers';

/**
 * A state descriptor for configuring an example that needs to run in a
 * particular named state, and with variables provided by the framework.
 *
 * @public
 */
export class InStateWithVariables {
  /** @internal */
  readonly '_case:state:type': typeof SETUP_VARIABLE_STATE;

  readonly stateName: string;

  readonly variables: Record<string, AnyMatcherOrData>;

  /**
   * Constructs a new state descriptor with the given variables.
   *
   * @param stateName - The name of the state used by this example. This must
   * match one of the state handlers provided in the configuration during the
   * example run.
   *
   * @param variables - A object where the keys are variable names, mapped to any data or matcher objects.
   */
  constructor(stateName: string, variables: Record<string, AnyMatcherOrData>) {
    this['_case:state:type'] = SETUP_VARIABLE_STATE;
    this.stateName = stateName;
    this.variables = variables;
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
   * This method returns the entire state descriptor as a JSON string, as a convenience
   * so that wrapper libraries don't need to figure out how to walk a tree of example objects.
   *
   * You shouldn't need to override this method.
   *
   * @returns A JSON string representation of this state.
   */
  stringify(): string {
    return JSON.stringify(this);
  }
}
