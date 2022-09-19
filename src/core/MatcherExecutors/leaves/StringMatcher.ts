import type { MatchContext } from 'core/context/types';
import type { CoreStringMatcher } from 'core/matchers/types';
import { errorWhen, matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import { testExactMatch } from './testExactMatch';

export const StringMatcher = (
  matcher: CoreStringMatcher,
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
