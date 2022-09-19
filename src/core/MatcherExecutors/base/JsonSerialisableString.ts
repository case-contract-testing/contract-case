import type { MatchContext } from 'core/context/types';
import type { CoreJsonSerialisableStringMatcher } from 'core/matchers/types';
import { errorWhen, matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import { testExactMatch } from './exactMatcher';

export const JsonSerialisableString = (
  matcher: CoreJsonSerialisableStringMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => [
  ...errorWhen(
    matchContext['case:context:matchBy'] === 'exact',
    testExactMatch(matcher, actual)
  ),
  ...errorWhen(
    typeof actual !== 'string',
    matchingError(matcher, `'${typeof actual}' is not a string`, actual)
  ),
];
