import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALIABLE_TO_JSON = 'json' as const;

export interface MatchContext {
  handleNext: <T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>,
    actual: unknown,
    parentMatchContext: MatchContext
  ) => Promise<MatchResult>;
  'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
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
