import type { MatchContext } from 'entities/context/types';
import type { CoreStringMatcher } from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import { combineResults } from 'entities/results/MatchResult';
import type { MatchingError } from 'entities/types';
import { testExactMatch } from './testExactMatch';

export const StringMatcher = (
  matcher: CoreStringMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> =>
  combineResults(
    errorWhen(
      matchContext['case:context:matchBy'] === 'exact',
      testExactMatch(matcher, actual, matchContext)
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
