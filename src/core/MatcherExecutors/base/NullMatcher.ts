import type { CoreNullMatcher, NULL_MATCHER_TYPE } from 'core/matchers/types';
import { matchingError } from 'core/MatchingError';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchingError } from 'core/types';

export const NullMatcher: MatcherExecutor<typeof NULL_MATCHER_TYPE> = (
  matcher: CoreNullMatcher,
  actual: unknown
): Array<MatchingError> => {
  if (actual !== null) {
    return [matchingError(matcher, `'${actual}' is not null`, actual)];
  }
  return [];
};
