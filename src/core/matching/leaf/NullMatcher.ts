import type {
  CoreNullMatcher,
  NULL_MATCHER_TYPE,
} from 'core/nodes/matchers/types';
import { errorWhen, matchingError } from 'core/MatchingError';
import type { MatcherExecutor } from 'core/matching/types';
import type { MatchingError } from 'core/types';

export const NullMatcher: MatcherExecutor<typeof NULL_MATCHER_TYPE> = (
  matcher: CoreNullMatcher,
  actual: unknown
): Array<MatchingError> =>
  errorWhen(
    actual !== null,
    matchingError(matcher, `'${actual}' is not null`, actual)
  );
