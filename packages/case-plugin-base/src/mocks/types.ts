import { AnyCaseMatcher } from '../matchers/matchers.types';

export interface InternalContractCaseCoreBehaviour {
  type: string; // AnyMockDescriptorType;

  stateVariables: 'state' | 'default';

  triggers: 'provided' | 'generated';
}

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

export type CaseMockDescriptorFor<
  KnownMockDescriptors extends AnyMockDescriptor,
  T extends string,
> = Extract<KnownMockDescriptors, HasTypeForMockDescriptor<T>>;

export interface HasTypeForMockDescriptor<T extends string> {
  '_case:mock:type': T;
}

export const isCaseMock = (
  maybeMock: unknown,
): maybeMock is AnyMockDescriptor =>
  typeof maybeMock === 'object' &&
  maybeMock != null &&
  '_case:mock:type' in (maybeMock as AnyMockDescriptor);
