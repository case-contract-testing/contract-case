import {
  combineResults,
  makeResults,
  matchingError,
  actualToString,
} from '../../../entities/results';
import type {
  BOOLEAN_MATCHER_TYPE,
  CaseError,
  CheckMatchFn,
  CoreBooleanMatcher,
  MatchContext,
  MatcherExecutor,
} from '../../../entities/types';
import { testExactMatch } from './internal/testExactMatch';

const check: CheckMatchFn<typeof BOOLEAN_MATCHER_TYPE> = (
  matcher: CoreBooleanMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
  combineResults(
    matchContext['_case:context:matchBy'] === 'exact'
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
    matchContext['_case:context:matchBy'] === 'exact'
      ? `${matcher['_case:matcher:example']}`
      : '<any boolean>',
  check,
  strip: (matcher: CoreBooleanMatcher) => matcher['_case:matcher:example'],
};
