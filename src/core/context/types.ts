import type { AnyCaseNodeType, DataOrCaseNodeFor } from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export const MATCH_BY_TYPE = 'type' as const;
export const MATCH_BY_EXACT = 'exact' as const;

export const SERIALIABLE_TO_JSON = 'json' as const;

export interface MatchContext {
  handleNext: <T extends AnyCaseNodeType>(
    matcherOrData: DataOrCaseNodeFor<T>,
    actual: unknown,
    parentMatchContext: MatchContext
  ) => Array<MatchingError>;
  'case:context:matchBy': typeof MATCH_BY_TYPE | typeof MATCH_BY_EXACT;
  'case:context:serialisableTo': typeof SERIALIABLE_TO_JSON;
}

export interface MatchContextByType {
  'case:context:matchBy': 'type';
}

export interface MatchContextByExact {
  'case:context:matchBy': 'exact';
}
