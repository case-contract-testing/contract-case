import {
  AnyCaseMatcherOrData,
  LookupableMatcher,
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
  AnyData,
} from '@contract-case/case-entities-internal';
import type { MatcherExecutor } from '../../entities/nodes/types';
import type { Logger, LogLevel } from '../../entities/logger/types';
import type { ResultFormatter } from '../../entities/results/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALISABLE_TO_JSON = 'json' as const;

export interface RawLookupFns {
  lookupMatcher: (
    uniqueName: string,
    context: MatchContextWithoutLookup
  ) => AnyCaseMatcherOrData;
  saveLookupableMatcher: (
    matcher: LookupableMatcher,
    context: MatchContextWithoutLookup
  ) => void;
  addVariable: (
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseMatcherOrData,
    context: MatchContextWithoutLookup
  ) => [name: string, value: AnyCaseMatcherOrData];
  lookupVariable: (
    name: string,
    context: MatchContextWithoutLookup
  ) => AnyCaseMatcherOrData;
}

export interface ContractLookupFns {
  lookupMatcher: (uniqueName: string) => AnyCaseMatcherOrData;
  saveLookupableMatcher: (matcher: LookupableMatcher) => void;
  addDefaultVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData
  ) => [name: string, value: AnyCaseMatcherOrData];
  addStateVariable: (
    name: string,
    stateName: string,
    value: AnyCaseMatcherOrData
  ) => [name: string, value: AnyCaseMatcherOrData];
  lookupVariable: (name: string) => AnyCaseMatcherOrData;
}

interface HasMakeLookupFn {
  makeLookup: (c: MatchContextWithoutLookup) => ContractLookupFns;
}

export interface TraversalFns {
  descendAndCheck: <T extends AnyCaseNodeType>(
    matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
    parentMatchContext: MatchContext,
    actual: unknown
  ) => ReturnType<MatcherExecutor<T>['check']>;
  descendAndStrip: <T extends AnyCaseNodeType>(
    matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
    parentMatchContext: MatchContext
  ) => ReturnType<MatcherExecutor<T>['strip']>;
  descendAndDescribe: <T extends AnyCaseNodeType>(
    matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
    parentMatchContext: MatchContext
  ) => string;
  selfVerify: <T extends AnyCaseNodeType>(
    matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
    parentMatchContext: MatchContext
  ) => ReturnType<MatcherExecutor<T>['check']>;
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
