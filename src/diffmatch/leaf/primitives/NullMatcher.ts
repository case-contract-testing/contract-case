import { errorWhen, matchingError, actualToString } from 'entities/results';
import type {
  CheckMatchFn,
  MatcherExecutor,
  MatchingError,
  MatchContext,
  CoreNullMatcher,
  NULL_MATCHER_TYPE,
} from 'entities/types';

const check: CheckMatchFn<typeof NULL_MATCHER_TYPE> = (
  matcher: CoreNullMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<MatchingError> =>
  errorWhen(
    actual !== null,
    matchingError(
      matcher,
      `${actualToString(actual)} is not null`,
      actual,
      matchContext
    )
  );

export const NullMatcher: MatcherExecutor<typeof NULL_MATCHER_TYPE> = {
  check,
  strip: () => null,
};
