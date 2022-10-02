import type {
  CoreBooleanMatcher,
  BOOLEAN_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { matchingError } from 'entities/results/MatchingError';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type { MatchingError } from 'entities/types';
import type { MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import { testExactMatch } from './testExactMatch';

export const BooleanMatcher: MatcherExecutor<typeof BOOLEAN_MATCHER_TYPE> = (
  matcher: CoreBooleanMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> =>
  combineResults(
    matchContext['case:context:matchBy'] === 'exact'
      ? testExactMatch(matcher, actual, matchContext)
      : makeResults(),
    typeof actual !== 'boolean'
      ? makeResults(
          matchingError(
            matcher,
            `'${actual}' is not a boolean`,
            actual,
            matchContext
          )
        )
      : makeResults()
  );
