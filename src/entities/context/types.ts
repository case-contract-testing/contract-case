import type { MatcherExecutor } from 'diffmatch/types';
import type {
  AnyCaseNodeType,
  AnyLeafOrStructure,
  CaseNodeFor,
} from 'entities/nodes/matchers/types';

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

export type MatchContext = Traversals & SeralisableContext;

export interface SeralisableContext {
  'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
  'case:context:location': Array<string>;
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
