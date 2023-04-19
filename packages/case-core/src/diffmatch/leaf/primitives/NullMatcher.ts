import {
  NULL_MATCHER_TYPE,
  CoreNullMatcher,
} from '@contract-case/case-entities-internal';
import {
  errorWhen,
  matchingError,
  actualToString,
} from '../../../entities/results';
import type {
  CheckMatchFn,
  MatchContext,
  CaseError,
  MatcherExecutor,
} from '../../../entities/types';

const check: CheckMatchFn<typeof NULL_MATCHER_TYPE> = (
  matcher: CoreNullMatcher,
  matchContext: MatchContext,
  actual: unknown
): Array<CaseError> =>
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
  describe: () => `null`,
  check,
  strip: () => null,
};
