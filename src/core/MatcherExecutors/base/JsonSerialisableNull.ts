import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { JsonNullMatcher } from 'dsl/Matchers/types';

export const JsonSerialiableNull = (
  matcher: JsonNullMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== null) {
    return [makeMatchingError(matcher, `'${actual}' is not null`, actual)];
  }
  return [];
};
