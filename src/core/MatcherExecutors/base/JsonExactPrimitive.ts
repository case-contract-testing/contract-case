import { makeMatchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';
import type { JsonExactPrimitiveMatcher } from 'dsl/Matchers/types';

export const JsonExactPrimitive = (
  matcher: JsonExactPrimitiveMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== matcher['case:matcher:exactlyEqualTo']) {
    return [
      makeMatchingError(
        matcher,
        `'${actual}' (${typeof actual}) is not exactly equal to '${
          matcher['case:matcher:exactlyEqualTo']
        }' (${typeof matcher['case:matcher:exactlyEqualTo']})`,
        actual
      ),
    ];
  }
  return [];
};
