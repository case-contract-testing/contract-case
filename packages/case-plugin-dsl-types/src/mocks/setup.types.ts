import { HasTypeForMockDescriptor } from './nodes.types';

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
  stateVariables: Record<string, VariableValue>;
  /**
   * Setup returned by the mock executor (eg, urls, function names, etc)
   */
  mock: Record<string, VariableValue>;
  /**
   * Arbitrary map of invokeable functions. For most purposes, this can be
   * empty. Useful for allowing plugins to invoke functions - the intention is
   * that arguments and return values are JSON encoded strings.
   */
  functions: Record<string, (...args: string[]) => string>;
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
