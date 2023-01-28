import type {
  AnyInteraction,
  MatcherExecutor,
  AnyCaseNodeOrData,
  AnyCaseNodeType,
  AnyLeafOrStructure,
  CaseNodeFor,
  LookupableMatcher,
} from 'entities/nodes/types';
import type { Logger, LogLevel } from 'entities/logger/types';
import type { ResultPrinter } from 'entities/results/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALIABLE_TO_JSON = 'json' as const;

export interface RawLookupFns {
  lookupMatcher: (uniqueName: string, context: LogContext) => AnyCaseNodeOrData;
  saveLookupableMatcher: (
    matcher: LookupableMatcher,
    context: LogContext
  ) => void;
  addVariable: (
    name: string,
    type: 'default' | 'state',
    stateName: string,
    value: AnyCaseNodeOrData,
    context: LogContext
  ) => void;
  lookupVariable: (name: string, context: LogContext) => AnyCaseNodeOrData;
}

export interface ContractLookupFns {
  lookupMatcher: (uniqueName: string) => AnyCaseNodeOrData;
  saveLookupableMatcher: (matcher: LookupableMatcher) => void;
  addDefaultVariable: (
    name: string,
    stateName: string,
    value: AnyCaseNodeOrData
  ) => void;
  addStateVariable: (
    name: string,
    stateName: string,
    value: AnyCaseNodeOrData
  ) => void;
  lookupVariable: (name: string) => AnyCaseNodeOrData;
}

interface HasMakeLookup {
  makeLookup: (c: LogContext) => ContractLookupFns;
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

interface ContextLoggers {
  logger: Logger;
  resultPrinter: ResultPrinter;
  makeLogger: (m: LogLevelContext) => Logger;
}

export type MatchContext = TraversalFns &
  DefaultContext &
  ContextLoggers &
  ContractLookupFns &
  HasMakeLookup &
  Partial<InjectableContext> &
  Partial<ContractFileConfig> &
  HasLocation &
  LogLevelContext &
  RunContext;

export type HasLocation = {
  'case:currentRun:context:location': Array<string>;
};

export type LoggableContext = Omit<
  MatchContext,
  | keyof ContextLoggers
  | keyof TraversalFns
  | keyof ContractLookupFns
  | keyof HasMakeLookup
>;
export type LogContext = Omit<
  MatchContext,
  keyof ContractLookupFns | keyof HasMakeLookup
>;

export type LogLevelContext = HasLocation & {
  'case:currentRun:context:logLevel': LogLevel;
};

export interface ContractFileConfig {
  'case:currentRun:context:testRunId': string;
  'case:currentRun:context:contractDir': string;
}

export type MatchContextWithContractFileConfig = MatchContext &
  ContractFileConfig;

export type DefaultContext = HasLocation &
  LogLevelContext & {
    'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
    'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
    'case:currentRun:context:expectation': 'produce' | 'consume';
    'case:currentRun:context:contractMode': 'write' | 'read';
    'case:currentRun:context:printResults': boolean;
  };

interface InjectableContext {
  'case:currentRun:context:baseUrlUnderTest'?: string;
  'case:currentRun:context:expectation'?: 'produce' | 'consume';
  'case:currentRun:context:contractMode': 'write' | 'read';
}

export interface HasBaseUrlUnderTest {
  'case:currentRun:context:baseUrlUnderTest': string;
}

export interface RunContext
  extends Partial<InjectableContext & LogLevelContext & HasBaseUrlUnderTest> {
  'case:run:context:tree'?: AnyCaseNodeOrData | AnyInteraction;
  'case:currentRun:context:testName': string | 'OUTSIDE_TESTS';
  'case:currentRun:context:printResults': boolean;
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
