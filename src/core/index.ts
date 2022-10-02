import { applyDefaultContext } from './context';
import { matchCore } from './MatcherExecutors/matchCore';
import type {
  AnyCaseNodeType,
  DataOrCaseNodeFor,
} from './nodes/matchers/types';
import type { MatchResult } from './types';

export * from './CaseCoreError';

export const checkMatch = <T extends AnyCaseNodeType>(
  matcherOrData: DataOrCaseNodeFor<T>,
  actual: unknown
): Promise<MatchResult> =>
  matchCore(
    matcherOrData,
    actual,
    applyDefaultContext(matcherOrData, matchCore)
  );
