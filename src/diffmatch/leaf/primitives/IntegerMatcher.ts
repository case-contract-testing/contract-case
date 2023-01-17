import { errorWhen, matchingError, combineResults } from 'entities/results';
import type {
  CaseError,
  MatcherExecutor,
  MatchContext,
  CoreIntegerMatch,
  INTEGER_MATCH_TYPE,
} from 'entities/types';

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
    matchContext['case:context:matchBy'] === 'exact'
      ? `${matcher['case:matcher:example']}`
      : '<any integer>',
  check,
  strip: (matcher: CoreIntegerMatch) => matcher['case:matcher:example'],
};
