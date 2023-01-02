import {
  matchingError,
  combineResults,
  makeResults,
  actualToString,
} from 'entities/results';
import type {
  MatchingError,
  CheckMatchFn,
  MatcherExecutor,
  MatchContext,
  CoreBooleanMatcher,
  BOOLEAN_MATCHER_TYPE,
} from 'entities/types';

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
            `${actualToString(actual)} is not a boolean`,
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
