import type { MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import type {
  CoreStringMatcher,
  STRING_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import { combineResults } from 'entities/results/MatchResult';
import type { MatchingError } from 'entities/types';
import { testExactMatch } from './internal/testExactMatch';

const check = (
  matcher: CoreStringMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<MatchingError> =>
  combineResults(
    errorWhen(
      matchContext['case:context:matchBy'] === 'exact',
      testExactMatch(matcher, matchContext, actual)
    ),
    errorWhen(
      typeof actual !== 'string',
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext
      )
    )
  );

export const StringMatcher: MatcherExecutor<typeof STRING_MATCHER_TYPE> = {
  check,
};
