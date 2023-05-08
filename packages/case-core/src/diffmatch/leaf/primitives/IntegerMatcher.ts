import {
  CoreIntegerMatcher,
  INTEGER_MATCH_TYPE,
} from '@contract-case/case-entities-internal';
import {
  combineResults,
  errorWhen,
  matchingError,
} from '../../../entities/results';
import type {
  MatchContext,
  CaseError,
  MatcherExecutor,
} from '../../../entities/types';

const check = (
  matcher: CoreIntegerMatcher,
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
  describe: (matcher: CoreIntegerMatcher, matchContext: MatchContext) =>
    matchContext['_case:context:matchBy'] === 'exact'
      ? `${matcher['_case:matcher:example']}`
      : '<any integer>',
  check,
  strip: (matcher: CoreIntegerMatcher) => matcher['_case:matcher:example'],
};
