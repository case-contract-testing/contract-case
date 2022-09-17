import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { JsonExactPrimitiveMatcher } from 'dsl/Matchers/types';

export const JsonExact = (
  matcher: JsonExactPrimitiveMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== null) {
    return [makeMatchingError(matcher, `'${actual}' is not null`, actual)];
  }
  return [];
};
