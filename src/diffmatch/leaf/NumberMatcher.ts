import type { MatchContext } from 'entities/context/types';
import type { CoreNumberMatcher } from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import type { MatchingError } from 'entities/types';
import { testExactMatch } from './testExactMatch';

export const NumberMatcher = (
  matcher: CoreNumberMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => [
  ...errorWhen(
    matchContext['case:context:matchBy'] === 'exact',
    testExactMatch(matcher, actual)
  ),
  ...errorWhen(
    typeof actual !== 'number',
    matchingError(matcher, `'${typeof actual}' is not a number`, actual)
  ),
  ...errorWhen(
    matchContext['case:context:serialisableTo'] === 'json' &&
      Number.isNaN(actual),
    matchingError(matcher, 'NaN is not a valid JSON number', actual)
  ),
  ...errorWhen(
    matchContext['case:context:serialisableTo'] === 'json' &&
      !Number.isFinite(actual),
    matchingError(matcher, 'JSON numbers must be finite', actual)
  ),
];
