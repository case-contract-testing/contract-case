import { CaseExample } from '../core/contract/types';
import { LogLevel, Logger } from '../logger/types';
import { CaseError, MatchResult } from '../matchers/errors.types';
import {
  AnyCaseMatcherOrData,
  AnyData,
  AnyCaseMatcher,
} from '../matchers/matchers.types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALISABLE_TO_JSON = 'json' as const;

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

export interface ContractLookupFns {
  lookupMatcher: (uniqueName: string) => AnyCaseMatcherOrData;
  saveLookupableMatcher: (matcher: AnyCaseMatcher) => void;
  addDefaultVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData,
  ) => [name: string, value: AnyCaseMatcherOrData];
  addStateVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData,
  ) => [name: string, value: AnyCaseMatcherOrData];
  lookupVariable: (name: string) => AnyCaseMatcherOrData;
}

interface HasMakeLookupFn {
  makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns;
}

export interface TraversalFns {
  descendAndCheck: <T extends AnyCaseMatcherOrData>(
    matcherOrData: T,
    parentMatchContext: MatchContext,
    actual: unknown,
  ) => Promise<MatchResult> | MatchResult;
  descendAndStrip: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => AnyData;
  descendAndDescribe: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => string;
  selfVerify: (
    matcherOrData: AnyCaseMatcherOrData,
    parentMatchContext: MatchContext,
  ) => Promise<MatchResult> | MatchResult;
}

export type LogLevelContext = {
  '_case:currentRun:context:parentVersions': Array<string>;
  '_case:currentRun:context:logLevel': LogLevel;
  '_case:currentRun:context:location': Array<string>;
};

export type MatchContextWithoutLookup = Omit<
  MatchContext,
  keyof ContractLookupFns | keyof HasMakeLookupFn
>;

export interface ContractFileConfig {
  '_case:currentRun:context:testRunId': string;
  '_case:currentRun:context:contractDir': string;
  '_case:currentRun:context:contractFilename'?: string;
  '_case:currentRun:context:overwriteFile'?: boolean;
}

export type HasContractFileConfig = DataContext & ContractFileConfig;

export type DefaultContext = LogLevelContext & {
  '_case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  '_case:context:serialisableTo': typeof SERIALISABLE_TO_JSON;
  '_case:currentRun:context:contractMode': 'write' | 'read';
  '_case:currentRun:context:printResults': boolean;
};

interface InjectableContext {
  '_case:currentRun:context:baseUrlUnderTest'?: string;
  '_case:currentRun:context:contractMode': 'write' | 'read';
}

export interface HasBaseUrlUnderTest {
  '_case:currentRun:context:baseUrlUnderTest': string;
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
      ContractFileConfig
  > {
  '_case:currentRun:context:testName': string | 'OUTSIDE_TESTS';
  '_case:currentRun:context:printResults': boolean;
  '_case:currentRun:context:variables': Record<string, AnyCaseMatcherOrData>;
  '_case:currentRun:context:defaultConfig': Record<string, AnyData>;
  // TODO: These are from CaseConfig and should be auto generated
  '_case:currentRun:context:throwOnFail'?: boolean;
  '_case:currentRun:context:brokerCiAccessToken'?: string;
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

export interface MatchContextByType {
  '_case:context:matchBy': 'type';
}

export interface MatchContextByExact {
  '_case:context:matchBy': 'exact';
}

export interface HttpTestContext {
  baseUrl: string;
}

export interface LogContext {
  logger: Logger;
  resultPrinter: ResultFormatter;
  makeLogger: (m: LogLevelContext) => Logger;
}

export type DataContext = DefaultContext &
  Partial<InjectableContext> &
  Partial<ContractFileConfig> &
  RunContext &
  LogLevelContext &
  LogContext;

export type MatchContext = DataContext &
  TraversalFns &
  ContractLookupFns &
  HasMakeLookupFn;

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
