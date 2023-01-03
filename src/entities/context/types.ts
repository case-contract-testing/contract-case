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

export interface ContractFns {
  lookupMatcher: (uniqueName: string, logger: Logger) => AnyCaseNodeOrData;
  saveLookupableMatcher: (matcher: LookupableMatcher, logger: Logger) => void;
}

export interface ContractContextFns {
  lookupMatcher: (uniqueName: string) => AnyCaseNodeOrData;
  saveLookupableMatcher: (matcher: LookupableMatcher) => void;
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
}

interface ContextLoggers {
  logger: Logger;
  resultPrinter: ResultPrinter;
  makeLogger: (m: LogLevelContext) => Logger;
}

export type MatchContext = TraversalFns &
  DefaultContext &
  ContextLoggers &
  ContractContextFns &
  Partial<InjectableContext> &
  HasLocation &
  LogLevelContext &
  RunContext;

export type HasLocation = {
  'case:currentRun:context:location': Array<string>;
};

export type LoggableContext = Omit<
  MatchContext,
  keyof ContextLoggers | keyof TraversalFns | keyof ContractFns
>;

export type LogLevelContext = HasLocation & {
  'case:currentRun:context:logLevel': LogLevel;
};

export type DefaultContext = HasLocation &
  LogLevelContext & {
    'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
    'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
    'case:currentRun:context:expectation': 'produce' | 'consume';
  };

interface InjectableContext {
  'case:currentRun:context:baseUrlUnderTest'?: string;
  'case:currentRun:context:expectation'?: 'produce' | 'consume';
}

export interface HasBaseUrlUnderTest {
  'case:currentRun:context:baseUrlUnderTest': string;
}

export interface RunContext
  extends Partial<InjectableContext & LogLevelContext & HasBaseUrlUnderTest> {
  'case:run:context:tree'?: AnyCaseNodeOrData | AnyInteraction;
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
