import type {
  CoreJsonSerialisableNullMatcher,
  JSON_SERIALISABLE_NULL_TYPE,
} from 'core/matchers/types';
import { matchingError } from 'core/MatchingError';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchingError } from 'core/types';

export const JsonSerialiableNull: MatcherExecutor<
  typeof JSON_SERIALISABLE_NULL_TYPE
> = (
  matcher: CoreJsonSerialisableNullMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== null) {
    return [matchingError(matcher, `'${actual}' is not null`, actual)];
  }
  return [];
};
