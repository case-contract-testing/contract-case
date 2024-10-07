## API Report File for "@contract-case/case-plugin-base"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export const actualToString: <T>(actual: T, indent?: number) => string;

// @public
export const addLocation: (location: string, context: MatchContext) => MatchContext;

// @public
export interface AnyCaseMatcher {
    // (undocumented)
    '_case:matcher:type': string;
}

// Warning: (ae-incompatible-release-tags) The symbol "AnyCaseMatcherOrData" is marked as @public, but its signature references "AnyLeafOrStructure" which is marked as @internal
//
// @public
export type AnyCaseMatcherOrData = AnyCaseMatcher | AnyData | AnyLeafOrStructure;

// Warning: (ae-forgotten-export) The symbol "JsonSerialisablePrimitive" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "JsonMap" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "JsonArray" needs to be exported by the entry point index.d.ts
//
// @public
export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;

// Warning: (ae-internal-missing-underscore) The name "AnyLeafOrStructure" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type AnyLeafOrStructure = JsonSerialisablePrimitive | JsonOrMatcherArray | JsonOrMatcherMap;

// @public
export type AnyMockDescriptor = {
    '_case:mock:type': string;
    '_case:run:context:setup': InternalContractCaseCoreSetup;
    request?: AnyCaseMatcher;
    response?: AnyCaseMatcher;
};

// Warning: (ae-internal-missing-underscore) The name "applyNodeToContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const applyNodeToContext: (caseNodeOrData: AnyCaseMatcherOrData | AnyMockDescriptor, context: MatchContext, runConfig?: Partial<RunContext>) => MatchContext;

// @public
export type BaseSetupInfo = {
    variables: Record<string, VariableValue>;
};

// @public
export class CaseConfigurationError extends Error {
    constructor(message: string, context?: Pick<DataContext, '_case:currentRun:context:location'>);
}

// @public
export class CaseCoreError extends Error {
    constructor(message: string, context?: Pick<DataContext, '_case:currentRun:context:location'>);
}

// @public
export type CaseError = MatchingError | ConfigurationError | TriggerError | VerificationError | RawMatchError;

// @public
export class CaseFailedAssertionError extends Error {
    constructor(matchResult: MatchResult);
    // (undocumented)
    matchResult: MatchResult;
}

// @public
export type CaseMatcherFor<KnownMatcherDescriptors, T extends string> = Extract<KnownMatcherDescriptors, IsCaseNodeForType<T>>;

// @public
export type CaseMockDescriptorFor<KnownMockDescriptors extends AnyMockDescriptor, T extends string> = Extract<KnownMockDescriptors, HasTypeForMockDescriptor<T>>;

// @public
export class CaseTriggerError extends Error {
    constructor(message: string, context?: Pick<DataContext, '_case:currentRun:context:location'>);
}

// @public
export type CheckMatchFn<T> = (matcher: T, matchContext: MatchContext, actual: unknown) => Promise<MatchResult> | MatchResult;

// @public
export const combineResultPromises: (...results: (MatchResult | Promise<MatchResult>)[]) => Promise<MatchResult>;

// @public @deprecated
export const combineResults: (...results: MatchResult[]) => MatchResult;

// @public
export interface ConfigurationError {
    code: string;
    // (undocumented)
    location: Array<string>;
    // (undocumented)
    message: string;
    // (undocumented)
    toString: () => string;
    // (undocumented)
    type: typeof ERROR_TYPE_CONFIGURATION;
}

// Warning: (ae-internal-missing-underscore) The name "constructDataContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const constructDataContext: (makeLogger: (c: LogLevelContext) => Logger, resultPrinter: ResultFormatter, runConfig: Partial<RunContext>, defaults: Record<string, AnyData>, parentVersions: Array<string>) => DataContext;

// Warning: (ae-internal-missing-underscore) The name "constructMatchContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const constructMatchContext: (traversals: TraversalFns, makeLogger: (c: LogLevelContext) => Logger, makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns, resultPrinter: ResultFormatter, runConfig: Partial<RunContext>, defaults: Record<string, AnyData>, parentVersions: Array<string>) => MatchContext;

// @public
export type ContractCasePlugin<MatcherTypes extends string, MockTypes extends string, MatcherDescriptors extends IsCaseNodeForType<MatcherTypes>, MockDescriptors extends AnyMockDescriptor, AllSetupInfo> = {
    description: PluginDescription;
    matcherExecutors: {
        [T in MatcherTypes]: MatcherExecutor<T, CaseMatcherFor<MatcherDescriptors, T>>;
    };
    setupMocks: {
        [T in MockTypes]: MockExecutorFn<MockDescriptors, AllSetupInfo, T>;
    };
};

// Warning: (ae-internal-missing-underscore) The name "ContractFileConfig" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface ContractFileConfig {
    '_case:currentRun:context:contractDir': string;
    '_case:currentRun:context:contractFilename'?: string;
    '_case:currentRun:context:overwriteFile'?: boolean;
    '_case:currentRun:context:testRunId': string;
}

// @public
export interface ContractLookupFns {
    addDefaultVariable: (name: string, stateName: string, value: AnyCaseMatcherOrData) => [name: string, value: AnyCaseMatcherOrData];
    addStateVariable: (name: string, stateName: string, value: AnyCaseMatcherOrData) => [name: string, value: AnyCaseMatcherOrData];
    invokeFunctionByHandle: (handle: string, callerArguments: unknown[]) => Promise<unknown>;
    lookupMatcher: (uniqueName: string) => AnyCaseMatcherOrData;
    lookupVariable: (name: string) => AnyCaseMatcherOrData;
    saveLookupableMatcher: (matcher: AnyCaseMatcher) => void;
}

// @public
export const CORE_PLUGIN_PREFIX: "_CaseCore:";

// @public
export const coreLookupMatcher: (uniqueName: string, child: AnyCaseMatcherOrData) => LookupableMatcher;

// Warning: (ae-forgotten-export) The symbol "InjectableContext" needs to be exported by the entry point index.d.ts
// Warning: (ae-incompatible-release-tags) The symbol "DataContext" is marked as @public, but its signature references "ContractFileConfig" which is marked as @internal
// Warning: (ae-incompatible-release-tags) The symbol "DataContext" is marked as @public, but its signature references "RunContext" which is marked as @internal
// Warning: (ae-incompatible-release-tags) The symbol "DataContext" is marked as @public, but its signature references "LogLevelContext" which is marked as @internal
//
// @public
export type DataContext = DefaultContext & Partial<InjectableContext> & Partial<ContractFileConfig> & RunContext & LogLevelContext & LogContext;

// Warning: (ae-internal-missing-underscore) The name "DataOrCaseNodeFor" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type DataOrCaseNodeFor<KnownMatcherDescriptors, T extends string> = CaseMatcherFor<KnownMatcherDescriptors, T> | AnyLeafOrStructure;

// Warning: (ae-incompatible-release-tags) The symbol "DefaultContext" is marked as @public, but its signature references "LogLevelContext" which is marked as @internal
//
// @public
export type DefaultContext = LogLevelContext & {
    '_case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
    '_case:context:serialisableTo': typeof SERIALISABLE_TO_JSON;
    '_case:currentRun:context:contractMode': 'write' | 'read';
    '_case:currentRun:context:printResults': boolean;
};

// @public
export const ERROR_TYPE_CONFIGURATION: "CONFIGURATION_ERROR";

// @public
export const ERROR_TYPE_MATCHING: "MATCHING_ERROR";

// @public
export const ERROR_TYPE_RAW_MATCH: "RAW_MATCH_ERROR";

// @public
export const ERROR_TYPE_TEST_RESPONSE: "TEST_RESPONSE_ERROR";

// @public
export const ERROR_TYPE_TRIGGER: "TRIGGER_FUNCTION_ERROR";

// @public
export const errorWhen: (test: boolean, err: CaseError | Array<CaseError>) => MatchResult;

// Warning: (ae-internal-missing-underscore) The name "foldIntoContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const foldIntoContext: (caseNode: AnyCaseMatcher | AnyMockDescriptor, context: MatchContext) => MatchContext;

// @public
export const getPluginConfig: (context: DataContext, description: PluginDescription) => Record<string, unknown>;

// Warning: (ae-internal-missing-underscore) The name "HasBaseUrlUnderTest" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface HasBaseUrlUnderTest {
    // (undocumented)
    '_case:currentRun:context:baseUrlUnderTest': string;
}

// Warning: (ae-internal-missing-underscore) The name "HasContractFileConfig" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type HasContractFileConfig = DataContext & ContractFileConfig;

// @public
export const hasErrors: (result: MatchResult | CaseError[]) => boolean;

// @public
export type HasExample<T extends AnyCaseMatcher> = T & {
    '_case:matcher:example': unknown;
};

// @public
export const hasNoErrors: (result: MatchResult) => boolean;

// @public
export interface HasTypeForMockDescriptor<T extends string> {
    // (undocumented)
    '_case:mock:type': T;
}

// Warning: (ae-internal-missing-underscore) The name "HttpTestContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface HttpTestContext {
    // (undocumented)
    baseUrl: string;
}

// @public
export interface InternalContractCaseCoreBehaviour {
    stateVariables: 'state' | 'default';
    triggers: 'provided' | 'generated';
    type: string;
}

// @public
export interface InternalContractCaseCoreSetup {
    read: InternalContractCaseCoreBehaviour;
    write: InternalContractCaseCoreBehaviour;
}

// @public
export const isCaseMock: (maybeMock: unknown) => maybeMock is AnyMockDescriptor;

// @public
export const isCaseNode: (maybeMatcher: unknown) => maybeMatcher is AnyCaseMatcher;

// @public
export interface IsCaseNodeForType<T extends string> {
    // (undocumented)
    '_case:matcher:type': T;
}

// @public
export const isLookupableMatcher: (maybeMatcher: unknown) => maybeMatcher is LookupableMatcher;

// @public
export type JsonOrMatcherArray = Array<AnyCaseMatcherOrData>;

// @public
export type JsonOrMatcherMap = {
    [key: string]: AnyCaseMatcherOrData;
};

// Warning: (ae-internal-missing-underscore) The name "locationString" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const locationString: (matchContext: LogLevelContext) => string;

// @public
export interface LogContext {
    logger: Logger;
    // Warning: (ae-incompatible-release-tags) The symbol "makeLogger" is marked as @public, but its signature references "LogLevelContext" which is marked as @internal
    makeLogger: (m: LogLevelContext) => Logger;
    // Warning: (ae-incompatible-release-tags) The symbol "resultPrinter" is marked as @public, but its signature references "ResultFormatter" which is marked as @internal
    resultPrinter: ResultFormatter;
}

// @public
export interface Logger {
    debug: (message: string, ...additional: unknown[]) => Promise<void>;
    deepMaintainerDebug: (message: string, ...additional: unknown[]) => Promise<void>;
    error: (message: string, ...additional: unknown[]) => Promise<void>;
    maintainerDebug: (message: string, ...additional: unknown[]) => Promise<void>;
    warn: (message: string, ...additional: unknown[]) => Promise<void>;
}

// @public
export type LogLevel = 'none' | 'error' | 'warn' | 'debug' | 'maintainerDebug' | 'deepMaintainerDebug';

// Warning: (ae-internal-missing-underscore) The name "LogLevelContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type LogLevelContext = {
    '_case:currentRun:context:parentVersions': Array<string>;
    '_case:currentRun:context:logLevel': LogLevel;
    '_case:currentRun:context:location': Array<string>;
};

// Warning: (ae-internal-missing-underscore) The name "LOOKUP_MATCHER_TYPE" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const LOOKUP_MATCHER_TYPE: "_case:Lookup";

// @public
export interface LookupableMatcher {
    // (undocumented)
    '_case:matcher:child'?: AnyCaseMatcherOrData;
    // Warning: (ae-incompatible-release-tags) The symbol ""_case:matcher:type"" is marked as @public, but its signature references "LOOKUP_MATCHER_TYPE" which is marked as @internal
    //
    // (undocumented)
    '_case:matcher:type': typeof LOOKUP_MATCHER_TYPE;
    // (undocumented)
    '_case:matcher:uniqueName': string;
}

// @public
export const makeNoErrorResult: () => MatchResult;

// @public
export const makeResults: (...err: CaseError[]) => MatchResult;

// @public
export const MATCH_BY_EXACT: "exact";

// @public
export const MATCH_BY_TYPE: "type";

// Warning: (ae-forgotten-export) The symbol "HasMakeLookupFn" needs to be exported by the entry point index.d.ts
//
// @public
export type MatchContext = DataContext & TraversalFns & ContractLookupFns & HasMakeLookupFn;

// @public
export interface MatchContextByExact {
    // (undocumented)
    '_case:context:matchBy': 'exact';
}

// @public
export interface MatchContextByType {
    // (undocumented)
    '_case:context:matchBy': 'type';
}

// Warning: (ae-internal-missing-underscore) The name "MatchContextWithoutLookup" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type MatchContextWithoutLookup = Omit<MatchContext, keyof ContractLookupFns | keyof HasMakeLookupFn>;

// @public
export interface MatcherExecutor<MatcherType extends string, T extends IsCaseNodeForType<MatcherType>> {
    check: CheckMatchFn<T>;
    describe: NameMatcherFn<T>;
    strip: StripMatcherFn<T>;
}

// @public
export const matcherToString: <T>(actual: T, indent?: number) => string;

// @public
export interface MatchingError {
    actual: unknown;
    expected: unknown;
    location: Array<string>;
    matcher: AnyCaseMatcher;
    message: string;
    toString: () => string;
    // (undocumented)
    type: typeof ERROR_TYPE_MATCHING;
}

// @public
export const matchingError: (matcher: AnyCaseMatcher, message: string, actual: unknown, context: MatchContext, expected?: unknown) => CaseError;

// @public
export type MatchResult = Array<CaseError>;

// Warning: (ae-internal-missing-underscore) The name "MockConfig" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface MockConfig {
    // (undocumented)
    '_case:currentRun:context:mockConfig': Record<string, Record<string, unknown>>;
}

// @public
export type MockData<AllSetupInfo, T extends string> = {
    config: SetupInfoFor<AllSetupInfo, T>;
    assertableData: () => Promise<MockOutput>;
};

// @public
export type MockExecutorFn<AllMockDescriptors extends AnyMockDescriptor, AllSetupInfo, T extends string> = (mock: CaseMockDescriptorFor<AllMockDescriptors, T>, context: MatchContext) => Promise<MockData<AllSetupInfo, T>>;

// @public
export type MockOutput = {
    actual: unknown;
    expected: AnyCaseMatcherOrData;
    context: MatchContext;
};

// @public
export const mustResolveToNumber: (matcher: AnyCaseMatcherOrData, context: MatchContext) => number;

// @public
export const mustResolveToString: (matcher: AnyCaseMatcherOrData, context: MatchContext) => string;

// @public
export type NameMatcherFn<T> = (matcher: T, matchContext: MatchContext) => string;

// @public
export const nameMock: <M extends AnyMockDescriptor>(mock: M, context: MatchContext) => M;

// @public
export type PluginDescription = {
    humanReadableName: string;
    shortName: string;
    uniqueMachineName: string;
    version: string;
};

// Warning: (ae-internal-missing-underscore) The name "RawLookupFns" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface RawLookupFns {
    // (undocumented)
    addVariable: (name: string, type: 'default' | 'state', stateName: string, value: AnyCaseMatcherOrData, context: MatchContextWithoutLookup) => [name: string, value: AnyCaseMatcherOrData];
    // (undocumented)
    lookupMatcher: (uniqueName: string, context: MatchContextWithoutLookup) => AnyCaseMatcherOrData;
    // (undocumented)
    lookupVariable: (name: string, context: MatchContextWithoutLookup) => AnyCaseMatcherOrData;
    // (undocumented)
    saveLookupableMatcher: (matcher: AnyCaseMatcher, context: MatchContextWithoutLookup) => void;
}

// @public
export interface RawMatchError {
    actual: unknown;
    code: string;
    expected: unknown;
    location: Array<string>;
    message: string;
    // (undocumented)
    toString: () => string;
    // (undocumented)
    type: typeof ERROR_TYPE_RAW_MATCH;
}

// @public
export type ResolvesTo<T extends string> = {
    '_case:matcher:resolvesTo': T;
};

// Warning: (ae-internal-missing-underscore) The name "ResultFormatter" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type ResultFormatter = {
    printError: (e: CaseError, context: DataContext) => void;
    printSuccessTitle: (example: CaseExample, index: string, context: DataContext) => void;
    printFailureTitle: (example: CaseExample, index: string, context: DataContext) => void;
    printDownloadedContract: (filename: string, context: DataContext) => void;
};

// Warning: (ae-internal-missing-underscore) The name "RunContext" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface RunContext extends Partial<InjectableContext & LogLevelContext & HasBaseUrlUnderTest & ContractFileConfig & MockConfig> {
    // (undocumented)
    '_case:currentRun:context:brokerBaseUrl'?: string;
    // (undocumented)
    '_case:currentRun:context:brokerBasicAuth'?: {
        username: string;
        password: string;
    };
    // (undocumented)
    '_case:currentRun:context:brokerCiAccessToken'?: string;
    // (undocumented)
    '_case:currentRun:context:defaultConfig': Record<string, AnyData>;
    // (undocumented)
    '_case:currentRun:context:internals'?: {
        asyncVerification: boolean;
    };
    // (undocumented)
    '_case:currentRun:context:printResults': boolean;
    // (undocumented)
    '_case:currentRun:context:publish'?: false | true | 'ONLY_IN_CI' | 'NEVER' | 'ALWAYS';
    // (undocumented)
    '_case:currentRun:context:testName': string | 'OUTSIDE_TESTS';
    // (undocumented)
    '_case:currentRun:context:throwOnFail'?: boolean;
    // (undocumented)
    '_case:currentRun:context:variables': Record<string, AnyCaseMatcherOrData>;
}

// @public
export const SERIALISABLE_TO_JSON: "json";

// @public
export type SetupInfoFor<AllSetupInfo, T extends string> = Extract<AllSetupInfo, HasTypeForMockDescriptor<T>> & BaseSetupInfo;

// Warning: (ae-internal-missing-underscore) The name "shouldLog" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export const shouldLog: (context: LogLevelContext, logLevel: LogLevel) => boolean;

// @public
export type StripMatcherFn<T> = (matcher: T, matchContext: MatchContext) => AnyData;

// @public
export class StripUnsupportedError extends Error {
    constructor(matcher: AnyCaseMatcher, context: DataContext);
}

// @public
export interface TraversalFns {
    // (undocumented)
    descendAndCheck: <T extends AnyCaseMatcherOrData>(matcherOrData: T, parentMatchContext: MatchContext, actual: unknown) => Promise<MatchResult> | MatchResult;
    // (undocumented)
    descendAndDescribe: (matcherOrData: AnyCaseMatcherOrData, parentMatchContext: MatchContext) => string;
    // (undocumented)
    descendAndStrip: (matcherOrData: AnyCaseMatcherOrData, parentMatchContext: MatchContext) => AnyData;
    // (undocumented)
    selfVerify: (matcherOrData: AnyCaseMatcherOrData, parentMatchContext: MatchContext) => Promise<MatchResult> | MatchResult;
}

// @public
export interface TriggerError {
    // (undocumented)
    code: string;
    // (undocumented)
    location: Array<string>;
    // (undocumented)
    message: string;
    // (undocumented)
    toString: () => string;
    // (undocumented)
    type: typeof ERROR_TYPE_TRIGGER;
}

// @public
export interface VerificationError {
    code: string;
    // (undocumented)
    error: VerifyTriggerReturnObjectError;
    // (undocumented)
    location: Array<string>;
    // (undocumented)
    message: string;
    // (undocumented)
    toString: () => string;
    // (undocumented)
    type: typeof ERROR_TYPE_TEST_RESPONSE;
}

// @public
export class VerifyTriggerReturnObjectError extends Error {
    constructor(cause: unknown);
    // (undocumented)
    cause: unknown;
}

// Warnings were encountered during analysis:
//
// src/context/types.ts:390:3 - (ae-forgotten-export) The symbol "CaseExample" needs to be exported by the entry point index.d.ts
// src/mocks/executors.types.ts:24:3 - (ae-forgotten-export) The symbol "VariableValue" needs to be exported by the entry point index.d.ts

// (No @packageDocumentation comment for this package)

```