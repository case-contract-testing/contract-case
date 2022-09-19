import type {
  CoreJsonSerialisableBooleanMatcher,
  JSON_SERIALISABLE_BOOLEAN_TYPE,
} from 'core/matchers/types';
import { matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchContext } from 'core/context/types';
import { testExactMatch } from './exactMatcher';

export const JsonSerialiableBoolean: MatcherExecutor<
  typeof JSON_SERIALISABLE_BOOLEAN_TYPE
> = (
  matcher: CoreJsonSerialisableBooleanMatcher,
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
