import { StripUnsupportedError } from '../../entities/errors';
import {
  combineResults,
  errorWhen,
  makeResults,
  matchingError,
} from '../../entities/results';
import {
  AnyData,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
  ARRAY_LENGTH_MATCHER_TYPE,
  CoreArrayLengthMatcher,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from '../../entities/types';

const strip: StripMatcherFn<typeof ARRAY_LENGTH_MATCHER_TYPE> = (
  matcher: CoreArrayLengthMatcher,
  matchContext: MatchContext
): AnyData => {
  throw new StripUnsupportedError(matcher, matchContext);
};

const check: CheckMatchFn<typeof ARRAY_LENGTH_MATCHER_TYPE> = (
  matcher: CoreArrayLengthMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult =>
  Array.isArray(actual)
    ? combineResults(
        errorWhen(
          matcher['case:matcher:maxLength'] !==
            ARRAY_LENGTH_PARAMETER_INFINITE &&
            actual.length > matcher['case:matcher:maxLength'],
          matchingError(
            matcher,
            `Array length of '${actual.length}' is over the maximum length of ${matcher['case:matcher:maxLength']}`,
            actual,
            matchContext,
            `Array length <= ${matcher['case:matcher:maxLength']}`
          )
        ),
        errorWhen(
          actual.length < matcher['case:matcher:minLength'],
          matchingError(
            matcher,
            `Array length of '${actual.length}' is under the minimum length of ${matcher['case:matcher:minLength']}`,
            actual,
            matchContext,
            `Array length >= ${matcher['case:matcher:minLength']}`
          )
        )
      )
    : combineResults(
        makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not an array`,
            actual,
            matchContext,
            `An array`
          )
        )
      );

export const ArrayLengthExecutor: MatcherExecutor<
  typeof ARRAY_LENGTH_MATCHER_TYPE
> = {
  describe: (matcher) =>
    `an array of length min: ${matcher['case:matcher:minLength']}, max: ${matcher['case:matcher:maxLength']};`,
  check,
  strip,
};
