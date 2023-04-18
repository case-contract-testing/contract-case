import {
  combineResults,
  errorWhen,
  matchingError,
} from '../../../entities/results';
import type {
  CoreIntegerMatch,
  MatchContext,
  CaseError,
  MatcherExecutor,
  INTEGER_MATCH_TYPE,
} from '../../../entities/types';

const check = (
  matcher: CoreIntegerMatch,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
  combineResults(
    errorWhen(
      !Number.isInteger(actual),
      matchingError(matcher, 'Expected an integer', actual, matchContext)
    )
  );

export const IntegerMatcher: MatcherExecutor<typeof INTEGER_MATCH_TYPE> = {
  describe: (matcher: CoreIntegerMatch, matchContext: MatchContext) =>
    matchContext['_case:context:matchBy'] === 'exact'
      ? `${matcher['_case:matcher:example']}`
      : '<any integer>',
  check,
  strip: (matcher: CoreIntegerMatch) => matcher['_case:matcher:example'],
};
