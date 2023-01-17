import {
  matchingError,
  combineResults,
  makeResults,
  actualToString,
} from 'entities/results';
import type {
  CaseError,
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
): Array<CaseError> =>
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
  describe: (matcher: CoreBooleanMatcher, matchContext: MatchContext) =>
    matchContext['case:context:matchBy'] === 'exact'
      ? `${matcher['case:matcher:example']}`
      : '<any boolean>',
  check,
  strip: (matcher: CoreBooleanMatcher) => matcher['case:matcher:example'],
};
