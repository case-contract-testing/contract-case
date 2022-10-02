import type {
  CoreNullMatcher,
  NULL_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import type { MatcherExecutor } from 'core/matching/types';
import type { MatchingError } from 'entities/types';

export const NullMatcher: MatcherExecutor<typeof NULL_MATCHER_TYPE> = (
  matcher: CoreNullMatcher,
  actual: unknown
): Array<MatchingError> =>
  errorWhen(
    actual !== null,
    matchingError(matcher, `'${actual}' is not null`, actual)
  );
