import {
  combineResults,
  errorWhen,
  matchingError,
} from '../../../entities/results';
import type {
  CoreNumberMatcher,
  MatchContext,
  CaseError,
  MatcherExecutor,
  NUMBER_MATCHER_TYPE,
} from '../../../entities/types';
import { testExactMatch } from './internal/testExactMatch';

const check = (
  matcher: CoreNumberMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
  combineResults(
    errorWhen(
      matchContext['_case:context:matchBy'] === 'exact',
      testExactMatch(matcher, matchContext, actual)
    ),
    errorWhen(
      typeof actual !== 'number',
      matchingError(
        matcher,
        `'${typeof actual}' is not a number`,
        actual,
        matchContext
      )
    ),
    errorWhen(
      matchContext['_case:context:serialisableTo'] === 'json' &&
        Number.isNaN(actual),
      matchingError(
        matcher,
        'NaN is not a valid JSON number',
        actual,
        matchContext
      )
    ),
    errorWhen(
      matchContext['_case:context:serialisableTo'] === 'json' &&
        typeof actual === 'number' &&
        !Number.isFinite(actual),
      matchingError(
        matcher,
        'JSON numbers must be finite',
        actual,
        matchContext
      )
    )
  );

export const NumberMatcher: MatcherExecutor<typeof NUMBER_MATCHER_TYPE> = {
  describe: (matcher, matchContext) =>
    matchContext['_case:context:matchBy'] === 'exact'
      ? `${matcher['_case:matcher:example']}`
      : '<any number>',
  check,
  strip: (matcher: CoreNumberMatcher) => matcher['_case:matcher:example'],
};
