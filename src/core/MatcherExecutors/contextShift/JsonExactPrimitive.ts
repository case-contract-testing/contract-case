import type { CoreCascadingExactMatcher } from 'core/matchers/types';
import { matchingError } from 'core/MatchingError';
import type { MatchingError } from 'core/types';

export const JsonExactPrimitive = (
  matcher: CoreCascadingExactMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== matcher['case:matcher:exactlyEqualTo']) {
    return [
      matchingError(
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
