import type {
  CoreBooleanMatcher,
  BOOLEAN_MATCHER_TYPE,
} from 'core/nodes/matchers/types';
import { matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/matching/types';
import type { MatchContext } from 'core/context/types';
import { testExactMatch } from './testExactMatch';

export const BooleanMatcher: MatcherExecutor<typeof BOOLEAN_MATCHER_TYPE> = (
  matcher: CoreBooleanMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => [
  ...(matchContext['case:context:matchBy'] === 'exact'
    ? testExactMatch(matcher, actual)
    : []),
  ...(typeof actual !== 'boolean'
    ? [matchingError(matcher, `'${actual}' is not a boolean`, actual)]
    : []),
];
