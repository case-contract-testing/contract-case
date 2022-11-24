import type {
  CoreNullMatcher,
  NULL_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import type { MatchingError } from 'entities/types';
import type { MatchContext } from 'entities/context/types';
import type { CheckMatchFn, MatcherExecutor } from 'entities/executors/types';
import { actualToString } from 'entities/results/renderActual';

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
