import {
  AnyMockDescriptorType,
  InternalContractCaseCoreBehaviour,
  InternalContractCaseCoreSetup,
} from '@contract-case/case-entities-internal';

/**
 * This type defines the core behaviour that ContractCase has with this mock.
 *
 * If you are using the included example types from ContractCase (or any
 * extension libraries), you do not need to use this class (or understand this
 * documentation).
 *
 * See the definitions in the case-entities-internal package for more details.
 * @public
 */
export interface ContractCaseCoreBehaviour {
  /**
   * The type of this mock. Usually this is inverted on read vs write, for
   * example, a written MOCK_HTTP_CLIENT might become a MOCK_HTTP_SERVER during
   * reading.
   *
   * This will almost always be the same as the top level type for your mock
   * during read - but if it is different, ContractCase will respect this value.
   */
  readonly mockType: string;

  /**
   * Whether or not this mock mode will invoke state handlers. If set to
   * `"default"` then ContractCase will not invoke or require the state handlers
   * and will use the default values for all state variables. If set to `"state"`,
   * then ContractCase will invoke the state handlers and require the expected variables to
   * be returned.
   *
   * All other values are errors.
   */
  readonly stateVariables: string;

  /**
   * Whether or not this mock mode needs to be triggered by user-provided code.
   * If `"provided"` then ContractCase will require the user to provide a
   * trigger and a test function (eg, for testing an HTTP Client, code that will
   * invoke it must be provided). If `"generated"`, then ContractCase will not
   * require user provided triggers as it will generate them (eg, if the
   * system under test is an HTTP server, ContractCase will generate client calls).
   */
  readonly triggers: string;
}

/**
 * @public
 */
export interface ContractCaseCoreSetup {
  /**
   * Defines how the ContractCase core will behave when writing (ie, defining) an Example of this type.
   */
  readonly write: ContractCaseCoreBehaviour;
  /**
   * Defines how the ContractCase core will behave when reading (ie, verifying) a Example of this type.
   */
  readonly read: ContractCaseCoreBehaviour;
}

/**
 * This is mostly a type assertion - the case-core does its own validation of the types.
 * @internal
 */
const mapBehaviour = (
  behaviour: ContractCaseCoreBehaviour,
): InternalContractCaseCoreBehaviour => ({
  // Note that mockType -> type - this conversion is because `type` is a reserved word in JSii.
  type: behaviour.mockType as AnyMockDescriptorType,
  stateVariables:
    behaviour.stateVariables as InternalContractCaseCoreBehaviour['stateVariables'],
  triggers: behaviour.triggers as InternalContractCaseCoreBehaviour['triggers'],
});

/**
 * The base class for all ContractCase Mock Descriptors. Extend this if you are
 * implementing your own mock type.
 *
 * If you are using the included example types from ContractCase (or any
 * extension libraries), you do not need to read the documentation for this
 * class.
 * @public
 */
export abstract class AnyMockDescriptor {
  /** @internal */
  readonly '_case:mock:type': string;

  /** @internal */
  readonly '_case:run:context:setup': InternalContractCaseCoreSetup;

  /**
   * @param mockType - The type string for this mock description (see [Extending ContractCase](https://case.contract-testing.io/docs/advanced-topics/extending-case) for a description of these strings).
   *
   * Mock description type strings beginning with `_case:` are reserved for the default ContractCase
   * matchers. Only use a types prefixed with `_case:` if you wish to create a DSL for a special case
   * for a matching behaviour that is already provided by a core ContractCase mock.
   */
  constructor(mockType: string, setup: ContractCaseCoreSetup) {
    this['_case:mock:type'] = mockType;
    this['_case:run:context:setup'] = {
      read: mapBehaviour(setup.read),
      write: mapBehaviour(setup.write),
    };
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
