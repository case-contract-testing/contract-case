import {
  combineResults,
  errorWhen,
  matchingError,
} from '../../../entities/results';
import type {
  CoreStringMatcher,
  MatchContext,
  CaseError,
  MatcherExecutor,
  STRING_MATCHER_TYPE,
} from '../../../entities/types';
import { testExactMatch } from './internal/testExactMatch';

const check = (
  matcher: CoreStringMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
  combineResults(
    errorWhen(
      matchContext['_case:context:matchBy'] === 'exact',
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
  describe: (matcher, matchContext) =>
    matchContext['_case:context:matchBy'] === 'exact'
      ? `"${matcher['_case:matcher:example']}"`
      : '<any string>',
  check,
  strip: (matcher: CoreStringMatcher) => matcher['_case:matcher:example'],
};
