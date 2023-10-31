import {
  ARRAY_LENGTH_MATCHER_TYPE,
  CoreArrayLengthMatcher,
  AnyData,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from '@contract-case/case-entities-internal';
import { StripUnsupportedError } from '../../entities/errors';
import {
  combineResults,
  errorWhen,
  makeResults,
  matchingError,
} from '../../entities/results';
import {
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from '../../entities/types';

const strip: StripMatcherFn<typeof ARRAY_LENGTH_MATCHER_TYPE> = (
  matcher: CoreArrayLengthMatcher,
  matchContext: MatchContext,
): AnyData => {
  throw new StripUnsupportedError(matcher, matchContext);
};

const check: CheckMatchFn<typeof ARRAY_LENGTH_MATCHER_TYPE> = (
  matcher: CoreArrayLengthMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult =>
  Array.isArray(actual)
    ? combineResults(
        errorWhen(
          matcher['_case:matcher:maxLength'] !==
            ARRAY_LENGTH_PARAMETER_INFINITE &&
            actual.length > matcher['_case:matcher:maxLength'],
          matchingError(
            matcher,
            `Array length of '${actual.length}' is over the maximum length of ${matcher['_case:matcher:maxLength']}`,
            actual,
            matchContext,
            `Array length <= ${matcher['_case:matcher:maxLength']}`,
          ),
        ),
        errorWhen(
          actual.length < matcher['_case:matcher:minLength'],
          matchingError(
            matcher,
            `Array length of '${actual.length}' is under the minimum length of ${matcher['_case:matcher:minLength']}`,
            actual,
            matchContext,
            `Array length >= ${matcher['_case:matcher:minLength']}`,
          ),
        ),
      )
    : combineResults(
        makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not an array`,
            actual,
            matchContext,
            `An array`,
          ),
        ),
      );

export const ArrayLengthExecutor: MatcherExecutor<
  typeof ARRAY_LENGTH_MATCHER_TYPE
> = {
  describe: (matcher) =>
    `an array of length min: ${matcher['_case:matcher:minLength']}, max: ${matcher['_case:matcher:maxLength']};`,
  check,
  strip,
};
