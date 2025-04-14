import {
  AnyCaseMatcherOrData,
  AnyCaseMatcher,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';
import { LogLevel, Logger } from '../logger/types';
import { CaseError, MatchResult } from '../matchers/errors.types';
import { CaseExample } from './contract.types';

export { CaseExample };

/**
 * Indicates that we are doing a general shape match in this context
 *
 * @public
 */
export const MATCH_BY_TYPE = 'type' as const;
/**
 * Indicates that we are doing an exact values match in this context
 *
 * @public
 */
export const MATCH_BY_EXACT = 'exact' as const;

/**
 * Indicates that values must be serialisable to json
 *
 * @public
 */
export const SERIALISABLE_TO_JSON = 'json' as const;

/**
 * The functions that allows saving or looking up matchers
 * with a provided context
 *
 * @internal
 */
export interface RawLookupFns {
  lookupMatcher: (
    uniqueName: string,
    context: MatchContextWithoutLookup,
  ) => AnyCaseMatcherOrData;
  saveLookupableMatcher: (
    matcher: AnyCaseMatcher,
    context: MatchContextWithoutLookup,
  ) => void;
  addVariable: (
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseMatcherOrData,
    context: MatchContextWithoutLookup,
  ) => [name: string, value: AnyCaseMatcherOrData];
  lookupVariable: (
    name: string,
    context: MatchContextWithoutLookup,
  ) => AnyCaseMatcherOrData;
}

/**
 * The part of the context that allows saving or looking up data
 * bound to a specific context and contract
 *
 * @public
 */
export interface ContractLookupFns {
  /**
   * Looks up a previously saved matcher by unique name
   *
   * @param uniqueName - the name the matcher was saved with
   *
   * @returns the cached matcher
   * @throws CaseConfigurationError if there is no matcher defined
   */
  lookupMatcher: (uniqueName: string) => AnyCaseMatcherOrData;
  /**
   * Saves a matcher by the unique description. The description is generated
   * from the matcher, and may be overridden if the matcher has a uniqueName.
   *
   * @param matcher - the matcher to save.
   * @returns the cached matcher
   * @throws CaseConfigurationError if there is no matcher defined
   */
  saveLookupableMatcher: (matcher: AnyCaseMatcher) => void;
  /**
   * Adds a default variable to the *contract* (not the context). Primarily used
   * by the state handler setup code.
   *
   * It is unlikely that plugins will need to call this code.
   *
   * Note that this function modifies the contract.
   *
   * @param matcher - the matcher to save.
   * @returns the cached matcher
   * @throws CaseConfigurationError if there is no matcher defined
   */
  addDefaultVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData,
  ) => [name: string, value: AnyCaseMatcherOrData];
  /**
   * This function adds a state variable to the *contract*. Primarily used
   * by the state handler setup code.
   *
   * It is unlikely that plugins will need to call this function.
   *
   * @param matcher - the matcher to save.
   * @returns the cached matcher
   * @throws CaseConfigurationError if there is no matcher defined
   */
  addStateVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData,
  ) => [name: string, value: AnyCaseMatcherOrData];
  /**
   * Get a previously saved state variable, either from state or from the
   * default value.
   *
   * @param name - the name of the variable
   * @returns the matcher (or data) for the variable.
   * @throws CaseConfigurationError if the variable isn't set.
   */
  lookupVariable: (name: string) => AnyCaseMatcherOrData;
  /**
   * Convenience function so that mock executions can call out to user provided functions.
   *
   * Primarily used by the Function plugin, but may have other uses.
   * @param handle - the handle to the function (must have been previously registered)
   * @param callerArguments - the arguments to pass to the function (as an array)
   * @returns a promise that is the result of the call, or a CaseConfigurationError if the function invocation failed.
   */
  invokeFunctionByHandle: (
    handle: string,
    callerArguments: unknown[],
  ) => Promise<unknown>;
}

/**
 * A type for the part of the context that contains the makeLookup factory
 *
 * TODO: Move this out of the plugin lib
 *
 * @internal
 */
interface HasMakeLookupFn {
  makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns;
}

/**
 * Describes the traversals available at this point in the execution
 *
 * @public
 */
export interface TraversalFns {
  /**
   * Descend into the provided matcher, checking the actual data against the next matcher.
   *
   * Call this on any children of your matcher.
   * If your matcher has more than one child, call this
   * function multiple times and combine the result with
   * {@link combineResultPromises}
   * @param matcherOrData - the next matcher to check
   * @param parentMatchContext - the match context to pass to the matcher. You should construct one of these with {@link addLocation}
   * @param actual - the actual data at this point
   * @returns a Promise containing the match result. It's also valid to return a
   * raw `MatchResult`, but implementations should prefer the Promise form, as
   * the non-promise form will be removed in a future version.
   */
  descendAndCheck: <T extends AnyCaseMatcherOrData>(
    matcherOrData: T,
    parentMatchContext: MatchContext,
    actual: unknown,
  ) => Promise<MatchResult> | MatchResult;
  /**
   * Descend into the provided matcher, validating the expectations it was configured with.
   * The top level is called before executing an Example to confirm that the example is sane.
   *
   * Call this on any children of your matcher.
   * If your matcher has more than one child, call this
   * function multiple times and chain the promises together.
   *
   * @param matcherOrData - the next matcher to check
   * @param parentMatchContext - the match context to pass to the matcher. You should construct one of these with {@link addLocation}
   * @returns either a successful promise if everything validated correctly, or
   * a promise containing a `CaseConfigurationError` if validation failed.
   */
  descendAndValidate: <T extends AnyCaseMatcherOrData>(
    matcherOrData: T,
    parentMatchContext: MatchContext,
  ) => Promise<void>;

  /**
   * Descend into the provided matcher, stripping the matchers from it so that just the raw data is returned.
   *
   * The top level of this function can be called by users as a convenience.
   * Additionally, it is called during the pre-validation step where ContractCase
   * confirms that the example provided actually passes the matcher(s).
   *
   * Call this on any children of your matcher.
   * If your matcher has more than one child, call this
   * function multiple times and combine the result appropriately.
   *
   * @param matcherOrData - the next matcher to check
   * @param parentMatchContext - the match context to pass to the matcher. You should construct one of these with {@link addLocation}
   * @returns the example data represented by this matcher.
   */
  descendAndStrip: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => AnyData;
  /**
   * Descend into the provided matcher, describing the contents in English.
   *
   * The top level of this function can be called by users as a convenience.
   * Additionally, it's called in some cases where ContractCase wants to uniquely identify a matcher.
   *
   * Call this on any children of your matcher.
   * If your matcher has more than one child, call this
   * function multiple times and combine the result in the appropriate place in the string you're returning
   *
   * @param matcherOrData - the next matcher to check
   * @param parentMatchContext - the match context to pass to the matcher. You should construct one of these with {@link addLocation}
   * @returns the example data represented by this matcher.
   */
  descendAndDescribe: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => string;

  /**
   * Descend into the provided matcher, confirming that the result of `descendAndStrip` would pass as actual data.
   *
   * The top level of this function is called during the pre-validation step. You probably don't need to call it directly.
   *
   * Call this on any children of your matcher.
   * If your matcher has more than one child, call this
   * function multiple times and combine the result in the appropriate place in the string you're returning
   *
   * @param matcherOrData - the next matcher to check
   * @param parentMatchContext - the match context to pass to the matcher. You should construct one of these with {@link addLocation}
   * @returns the example data represented by this matcher.
   */
  selfVerify: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => Promise<void>;
}

/**
 * The parts of the context that are needed for logging
 *
 * @internal
 */
export type LogLevelContext = {
  '_case:currentRun:context:parentVersions': Array<string>;
  '_case:currentRun:context:logLevel': LogLevel;
  '_case:currentRun:context:location': Array<string>;
};

/**
 * The parts of the context that don't have the lookup functions
 *
 * @remarks
 * TODO: This is a convenience type for the Case Core, and could be moved out
 * of the plugin lib.
 *
 * @internal
 */
export type MatchContextWithoutLookup = Omit<
  MatchContext,
  keyof ContractLookupFns | keyof HasMakeLookupFn
>;

/**
 * Context to do with the contract file
 *
 * @internal
 */
export interface ContractFileConfig {
  /**
   * The current test run ID
   */
  '_case:currentRun:context:testRunId': string;
  /**
   * The directory for contract files.
   *
   * Note that they may be in a subdirectory of this dir
   */
  '_case:currentRun:context:contractDir': string;
  /**
   * The filename for the contract file (if known)
   */
  '_case:currentRun:context:contractFilename'?: string;
  /**
   * Whether we should allow overwriting the contract file.
   *
   * This setting is ignored (assumed true) if contractDir is set
   *
   * Currently, this setting is only used internally, it is not exposed to users.
   */
  '_case:currentRun:context:overwriteFile'?: boolean;
}

/**
 * Convenience type combining base context and contract file context
 *
 * @internal
 */
export type HasContractFileConfig = DataContext & ContractFileConfig;

/**
 * The settings that are set as default context for a run
 *
 * @public
 */
export type DefaultContext = LogLevelContext & {
  '_case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  /**
   * What the contract must be serialisable to - used by matchers for excluding
   * values of number (etc) that are not valid in json
   */
  '_case:context:serialisableTo': typeof SERIALISABLE_TO_JSON;
  /**
   * Whether we are currently writing (ie, defining) or reading (ie, verifying) a contract.
   * This is only different to 'define' and 'verify' to avoid confusing terminology internally
   */
  '_case:currentRun:context:contractMode': 'write' | 'read';
  /**
   * Whether or not we should print results during this run
   */
  '_case:currentRun:context:printResults': boolean;
  /**
   * What's the connector client (ie, host language) for this run?
   */
  '_case:currentRun:context:connectorClient': string;

  /**
   * How to generate the version for the system under test
   */
  '_case:currentRun:context:autoVersionFrom': 'TAG' | 'GIT_SHA';
};

/**
 * These elements of context are injectable by the user
 *
 * @internal
 */
interface InjectableContext {
  '_case:currentRun:context:baseUrlUnderTest'?: string;
  '_case:currentRun:context:contractMode': 'write' | 'read';
  '_case:currentRun:context:autoVersionFrom': 'TAG' | 'GIT_SHA';
}

/**
 * The part of the context that contains the base url under test.
 *
 * @internal
 */
export interface HasBaseUrlUnderTest {
  '_case:currentRun:context:baseUrlUnderTest': string;
}

/**
 * Custom configuration for plugin mocks. Plugins must validate their config
 * data at the time it needs it - throw a CaseConfigurationError if required
 * configuration keys are missing, or malformed.
 *
 * The format is a double Record - the first key is the plugin short name, the
 * second key is the configuration key. Values are arbitrary.
 *
 * @internal
 */
export interface MockConfig {
  '_case:currentRun:context:mockConfig': Record<
    string,
    Record<string, unknown>
  >;
}

/**
 * RunContext exists distinct from CaseConfig, as it allows us to have internal configuration properties that aren't exposed
 *
 * @internal
 */
export interface RunContext
  extends Partial<
    InjectableContext &
      LogLevelContext &
      HasBaseUrlUnderTest &
      ContractFileConfig &
      MockConfig
  > {
  '_case:currentRun:context:testName': string | 'OUTSIDE_TESTS';
  '_case:currentRun:context:printResults': boolean;
  '_case:currentRun:context:variables': Record<string, AnyCaseMatcherOrData>;
  '_case:currentRun:context:defaultConfig': Record<string, AnyData>;
  '_case:currentRun:context:connectorClient': string;
  // TODO: These are from CaseConfig and should be auto generated
  '_case:currentRun:context:throwOnFail'?: boolean;
  '_case:currentRun:context:brokerCiAccessToken'?: string;
  '_case:currentRun:context:autoVersionFrom'?: 'TAG' | 'GIT_SHA';
  '_case:currentRun:context:publish'?:
    | false
    | true
    | 'ONLY_IN_CI'
    | 'NEVER'
    | 'ALWAYS';
  '_case:currentRun:context:brokerBasicAuth'?: {
    username: string;
    password: string;
  };
  '_case:currentRun:context:brokerBaseUrl'?: string;
  '_case:currentRun:context:internals'?: {
    asyncVerification: boolean;
  };
}

/**
 * If the context is assignable to this type, it indicates that
 * the matchers should default to shape (ie, type) matching
 *
 * @public
 */
export interface MatchContextByType {
  '_case:context:matchBy': 'type';
}

/**
 * If the context is assignable to this type, it indicates
 * that the matchers should default to exact matching
 *
 * @public
 */
export interface MatchContextByExact {
  '_case:context:matchBy': 'exact';
}

/**
 * Setup information for HTTP tests
 * TODO: Move this out of the base plugin
 *
 * @internal
 */
export interface HttpTestContext {
  baseUrl: string;
}

/**
 * Part of the context with the logger attached. Useful if you just want to pass
 * the logging functions to something. This is used in a few places where the whole
 * context isn't available (eg, before the context has been constructed).
 *
 * @public
 */
export interface LogContext {
  /** Current logger */
  logger: Logger;
  /** Used for printing results (should not be called by plugins) */
  resultPrinter: ResultFormatter;
  /** Constructor for making the logger when moving to different locations (should not be called by plugins) */
  makeLogger: (m: LogLevelContext) => Logger;
}

/**
 * Convenience type for just the parts of the context that have data - everything in this type
 * will be serialisable.
 *
 * @public
 */
export type DataContext = DefaultContext &
  Partial<InjectableContext> &
  Partial<ContractFileConfig> &
  RunContext &
  LogLevelContext &
  LogContext;

/**
 * The part of the context used during a matching run - contains traversal functions
 * and any lookup functions that arbitrary matchers or mocks might need.
 *
 * @public
 */
export type MatchContext = DataContext &
  TraversalFns &
  ContractLookupFns &
  HasMakeLookupFn;

/**
 * The result formatter is used for printing results. The core doesn't know how these are
 * formatted and printed - this is up to the host DSL wrappers.
 *
 * @internal
 */
export type ResultFormatter = {
  printError: (e: CaseError, context: DataContext) => void;
  printSuccessTitle: (
    example: CaseExample,
    index: string,
    context: DataContext,
  ) => void;
  printFailureTitle: (
    example: CaseExample,
    index: string,
    context: DataContext,
  ) => void;
  printDownloadedContract: (filename: string, context: DataContext) => void;
};
