import type { MatcherExecutor } from 'entities/executors/types';
import type { Logger, LogLevel } from 'entities/logger/types';
import type {
  AnyCaseNodeOrData,
  AnyCaseNodeType,
  AnyLeafOrStructure,
  CaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { AnyInteraction } from 'entities/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALIABLE_TO_JSON = 'json' as const;

export interface Traversals {
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
  baseLogger: Logger;
}

export type MatchContext = Traversals &
  DefaultContext &
  ContextLoggers &
  Partial<InjectableContext> &
  RunContext;

export interface DefaultContext {
  'case:run:context:location': Array<string>;
  'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
  'case:run:context:expectation': 'produce' | 'consume';
}

export interface InjectableContext {
  'case:run:context:baseurl'?: string;
  'case:run:context:expectation': 'produce' | 'consume';
  'case:run:context:logLevel'?: LogLevel;
}

export interface RunContext extends Partial<InjectableContext> {
  'case:run:context:tree': AnyCaseNodeOrData | AnyInteraction;
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
