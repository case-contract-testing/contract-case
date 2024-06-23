import { MatchContext } from '../context/types';
import { AnyCaseMatcherOrData } from '../matchers/matchers.types';
import {
  AnyMockDescriptor,
  CaseMockDescriptorFor,
  HasTypeForMockDescriptor,
} from './nodes.types';

// We allow Any here for now, because it makes defining tests very convenient
// TODO: Don't use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VariableValue = any;

/**
 * The base SetupInfo provided to all mock setup functions and triggers.
 * @public
 * @remarks
 * All SetupInfo objects extend this type
 */
export type BaseSetupInfo = {
  /**
   * Variables provided by state setup functions
   */
  variables: Record<string, VariableValue>;
};

/**
 * Helper type to extract a specific mock's SetupInfo object form all known SetupInfo objects
 * @public
 * @typeParam AllSetupInfo - All known SetupInfo objects
 * @typeParam T - the type of the mock descriptor that you want to get the SetupInfo for.
 */
export type SetupInfoFor<AllSetupInfo, T extends string> = Extract<
  AllSetupInfo,
  HasTypeForMockDescriptor<T>
> &
  BaseSetupInfo;

type MockOutput = {
  actual: unknown;
  expected: AnyCaseMatcherOrData;
  context: MatchContext;
};

/**
 * Represents the data produced by an invocation of a mock, ready for assertion.
 * @public
 * @typeParam AllSetupInfo - All known SetupInfo objects
 * @typeParam T - the type of the mock descriptor that this data is for
 */
export type MockData<AllSetupInfo, T extends string> = {
  config: SetupInfoFor<AllSetupInfo, T>;
  assertableData: () => Promise<MockOutput>;
};

/**
 * A function that will set up and run a mock.
 * @public
 * @typeParam AllMockDescriptors - All known MockDescriptor objects
 * @typeParam AllSetupInfo - All known SetupInfo objects
 * @typeParam T - the type of the mock descriptor that this function consumes
 * @param mock - The mock descriptor object that the user provides
 * @param context - The {@link MatchContext} object for this run
 * @returns - a Promise of the {@link MockData} resulting from this execution
 */
export type MockExecutorFn<
  AllMockDescriptors extends AnyMockDescriptor,
  AllSetupInfo,
  T extends string,
> = (
  mock: CaseMockDescriptorFor<AllMockDescriptors, T>,
  context: MatchContext,
) => Promise<MockData<AllSetupInfo, T>>;
