import { AnyCaseMatcher } from '../matchers/matchers.types';

/**
 * Describes how contract case behaves with this type of mock.
 */
export interface InternalContractCaseCoreBehaviour {
  /**
   * The constant type for the mock descriptor used to mock this behaviour
   */
  type: string; // AnyMockDescriptorType;

  /**
   * Describes the source of state variables.
   *
   * * `'state'` - variables are provided by state handlers
   * * `'default'` - variables are provided by the default in the state descriptor
   */
  stateVariables: 'state' | 'default';

  /**
   * Describes whether the trigger functions for this mock are user `provided`, or
   * whether ContractCase will use the default functions it `generated`.
   */
  triggers: 'provided' | 'generated';
}

/**
 * Controls the behaviour of the mock when writing or reading contracts with this type.
 */
export interface InternalContractCaseCoreSetup {
  /**
   * Defines how the ContractCase core will behave when writing (ie, defining) an Example of this type.
   */
  write: InternalContractCaseCoreBehaviour;
  /**
   * Defines how the ContractCase core will behave when reading (ie, verifying) a Example of this type.
   */
  read: InternalContractCaseCoreBehaviour;
}

export type AnyMockDescriptor = {
  '_case:mock:type': string;
  '_case:run:context:setup': InternalContractCaseCoreSetup;
  request?: AnyCaseMatcher;
  response?: AnyCaseMatcher;
};

/**
 * Helper type for extracting a mock descriptor from all the known mock descriptors
 *
 * @typeParam KnownMockDescriptors - All the mock descriptor objects known
 * @typeParam T - The string constant for the mock descriptor that we're interested in
 */
export type CaseMockDescriptorFor<
  KnownMockDescriptors extends AnyMockDescriptor,
  T extends string,
> = Extract<KnownMockDescriptors, HasTypeForMockDescriptor<T>>;

/**
 * Helper type for a contract case mock descriptor object. All mock descriptors
 * must extend this for the string constant that they use
 *
 * @typeParam T - The string constant for the mock descriptor.
 */
export interface HasTypeForMockDescriptor<T extends string> {
  '_case:mock:type': T;
}

/**
 * Determines if a given value is a valid mock descriptor.
 *
 * @remarks
 *
 * This function checks if the provided value is an object and contains the
 * property '_case:mock:type', indicating that it is a valid mock descriptor.
 *
 * @param maybeMock - The value to be checked.
 * @returns A boolean indicating whether the provided value is a valid mock descriptor.
 */
export const isCaseMock = (
  maybeMock: unknown,
): maybeMock is AnyMockDescriptor =>
  typeof maybeMock === 'object' &&
  maybeMock != null &&
  '_case:mock:type' in (maybeMock as AnyMockDescriptor);
