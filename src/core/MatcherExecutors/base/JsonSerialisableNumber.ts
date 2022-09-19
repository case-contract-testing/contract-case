import type { MatchContext } from 'core/context/types';
import type { CoreJsonSerialiasbleNumberMatcher } from 'core/matchers/types';
import { errorWhen, matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import { testExactMatch } from './exactMatcher';

export const JsonSerialiableNumber = (
  matcher: CoreJsonSerialiasbleNumberMatcher,
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
    Number.isNaN(actual),
    matchingError(matcher, 'NaN is not a valid JSON number', actual)
  ),
  ...errorWhen(
    !Number.isFinite(actual),
    matchingError(matcher, 'JSON numbers must be finite', actual)
  ),
];
