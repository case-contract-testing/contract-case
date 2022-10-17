import type { MatchContext } from 'entities/context/types';
import type { MatcherExecutor } from 'entities/executors/types';
import type {
  CoreNumberMatcher,
  NUMBER_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import { combineResults } from 'entities/results/MatchResult';
import type { MatchingError } from 'entities/types';
import { testExactMatch } from './internal/testExactMatch';

const check = (
  matcher: CoreNumberMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<MatchingError> =>
  combineResults(
    errorWhen(
      matchContext['case:context:matchBy'] === 'exact',
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
      matchContext['case:context:serialisableTo'] === 'json' &&
        Number.isNaN(actual),
      matchingError(
        matcher,
        'NaN is not a valid JSON number',
        actual,
        matchContext
      )
    ),
    errorWhen(
      matchContext['case:context:serialisableTo'] === 'json' &&
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
  check,
  strip: (matcher: CoreNumberMatcher) => matcher['case:matcher:example'],
};
