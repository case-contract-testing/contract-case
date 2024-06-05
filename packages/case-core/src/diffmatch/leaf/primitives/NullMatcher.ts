import {
  NULL_MATCHER_TYPE,
  CoreNullMatcher,
} from '@contract-case/case-entities-internal';
import {
  CheckMatchFn,
  MatchContext,
  CaseError,
  errorWhen,
  matchingError,
  actualToString,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';

const check: CheckMatchFn<CoreNullMatcher> = (
  matcher: CoreNullMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Array<CaseError> =>
  errorWhen(
    actual !== null,
    matchingError(
      matcher,
      `${actualToString(actual)} is not null`,
      actual,
      matchContext,
    ),
  );

export const NullMatcher: MatcherExecutor<
  typeof NULL_MATCHER_TYPE,
  CoreNullMatcher
> = {
  describe: () => `null`,
  check,
  strip: () => null,
};
