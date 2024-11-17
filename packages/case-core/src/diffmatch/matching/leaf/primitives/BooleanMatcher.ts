import {
  BOOLEAN_MATCHER_TYPE,
  CoreBooleanMatcher,
} from '@contract-case/case-entities-internal';

import {
  CheckMatchFn,
  MatchContext,
  CaseError,
  combineResults,
  makeResults,
  matchingError,
  actualToString,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import { testExactMatch } from './internal/testExactMatch';

const check: CheckMatchFn<CoreBooleanMatcher> = (
  matcher: CoreBooleanMatcher,
  matchContext: MatchContext,
  actual: unknown,
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
            matchContext,
          ),
        )
      : makeResults(),
  );

export const BooleanMatcher: MatcherExecutor<
  typeof BOOLEAN_MATCHER_TYPE,
  CoreBooleanMatcher
> = {
  describe: (matcher: CoreBooleanMatcher, matchContext: MatchContext) =>
    matchContext['_case:context:matchBy'] === 'exact'
      ? `${matcher['_case:matcher:example']}`
      : '<any boolean>',
  check,
  strip: (matcher: CoreBooleanMatcher) => matcher['_case:matcher:example'],
  validate: () => Promise.resolve(),
};
