import { errorWhen, matchingError, combineResults } from 'entities/results';
import type {
  MatchingError,
  MatchContext,
  MatcherExecutor,
  CoreStringMatcher,
  STRING_MATCHER_TYPE,
} from 'entities/types';

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
  strip: (matcher: CoreStringMatcher) => matcher['case:matcher:example'],
};
