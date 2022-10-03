import type {
  CoreBooleanMatcher,
  BOOLEAN_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { matchingError } from 'entities/results/MatchingError';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type { MatchingError } from 'entities/types';
import type { CheckMatchFn, MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import { testExactMatch } from './internal/testExactMatch';

const check: CheckMatchFn<typeof BOOLEAN_MATCHER_TYPE> = (
  matcher: CoreBooleanMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<MatchingError> =>
  combineResults(
    matchContext['case:context:matchBy'] === 'exact'
      ? testExactMatch(matcher, matchContext, actual)
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

export const BooleanMatcher: MatcherExecutor<typeof BOOLEAN_MATCHER_TYPE> = {
  check,
  strip: (matcher: CoreBooleanMatcher) => matcher['case:matcher:example'],
};
