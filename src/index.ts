import { applyDefaultContext } from 'core/context';
import { matchCore } from 'core/matchCore';
import type {
  AnyCaseNodeType,
  CaseNodeFor,
  AnyLeafOrStructure,
} from 'core/matchers/types';
import type { MatchingError } from 'core/types';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: CaseNodeFor<T> | AnyLeafOrStructure,
  actual: unknown
): Array<MatchingError> =>
  matchCore(
    matcherOrData,
    actual,
    applyDefaultContext(matcherOrData, matchCore)
  );
