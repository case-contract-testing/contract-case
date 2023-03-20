import type {
  MatcherExecutor,
  AnyCaseNodeOrData,
  AnyCaseNodeType,
  AnyLeafOrStructure,
  CaseNodeFor,
  LookupableMatcher,
} from '../../entities/nodes/types';
import type { Logger, LogLevel } from '../../entities/logger/types';
import type { ResultPrinter } from '../../entities/results/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALIABLE_TO_JSON = 'json' as const;

export interface RawLookupFns {
  lookupMatcher: (
    uniqueName: string,
    context: MatchContextWithoutLookup
  ) => AnyCaseNodeOrData;
  saveLookupableMatcher: (
    matcher: LookupableMatcher,
    context: MatchContextWithoutLookup
  ) => void;
  addVariable: (
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseNodeOrData,
    context: MatchContextWithoutLookup
  ) => [name: string, value: AnyCaseNodeOrData];
  lookupVariable: (
    name: string,
    context: MatchContextWithoutLookup
  ) => AnyCaseNodeOrData;
}

export interface ContractLookupFns {
  lookupMatcher: (uniqueName: string) => AnyCaseNodeOrData;
  saveLookupableMatcher: (matcher: LookupableMatcher) => void;
  addDefaultVariable: (
    name: string,
    stateName: string,
    value: AnyCaseNodeOrData
  ) => [name: string, value: AnyCaseNodeOrData];
  addStateVariable: (
    name: string,
    stateName: string,
    value: AnyCaseNodeOrData
  ) => [name: string, value: AnyCaseNodeOrData];
  lookupVariable: (name: string) => AnyCaseNodeOrData;
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

export type HasLocation = {
  'case:currentRun:context:location': Array<string>;
};

export type MatchContextWithoutLookup = Omit<
  MatchContext,
  keyof ContractLookupFns | keyof HasMakeLookupFn
>;

export type LogLevelContext = HasLocation & {
  'case:currentRun:context:logLevel': LogLevel;
};

export interface ContractFileConfig {
  'case:currentRun:context:testRunId': string;
  'case:currentRun:context:contractDir': string;
  'case:currentRun:context:contractFilename'?: string;
}

export type MatchContextWithContractFileConfig = MatchContext &
  ContractFileConfig;

export type DefaultContext = HasLocation &
  LogLevelContext & {
    'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
    'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
    'case:currentRun:context:contractMode': 'write' | 'read';
    'case:currentRun:context:printResults': boolean;
  };

interface InjectableContext {
  'case:currentRun:context:baseUrlUnderTest'?: string;
  'case:currentRun:context:contractMode': 'write' | 'read';
}

export interface HasBaseUrlUnderTest {
  'case:currentRun:context:baseUrlUnderTest': string;
}

export interface RunContext
  extends Partial<InjectableContext & LogLevelContext & HasBaseUrlUnderTest> {
  'case:currentRun:context:testName': string | 'OUTSIDE_TESTS';
  'case:currentRun:context:printResults': boolean;
  'case:currentRun:context:variables': Record<string, AnyCaseNodeOrData>;
  // TODO: These are from CaseConfig and should be auto generated
  'case:currentRun:context:brokerCiAccessToken'?: string;
  'case:currentRun:context:brokerBaseUrl'?: string;
}

export interface MatchContextByType {
  'case:context:matchBy': 'type';
}

export interface MatchContextByExact {
  'case:context:matchBy': 'exact';
}

export interface HttpTestContext {
  baseUrl: string;
}

export interface LogContext {
  logger: Logger;
  resultPrinter: ResultPrinter;
  makeLogger: (m: LogLevelContext) => Logger;
}

export type DataContext = DefaultContext &
  Partial<InjectableContext> &
  Partial<ContractFileConfig> &
  HasLocation &
  RunContext &
  LogLevelContext &
  LogContext;

export type MatchContext = DataContext &
  TraversalFns &
  ContractLookupFns &
  HasMakeLookupFn;
