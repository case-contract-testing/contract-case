import {
  ARRAY_LENGTH_MATCHER_TYPE,
  CoreArrayLengthMatcher,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from '@contract-case/case-entities-internal';
import {
  StripMatcherFn,
  MatchContext,
  StripUnsupportedError,
  CheckMatchFn,
  MatchResult,
  combineResults,
  errorWhen,
  matchingError,
  makeResults,
  MatcherExecutor,
  CaseConfigurationError,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const strip: StripMatcherFn<CoreArrayLengthMatcher> = (
  matcher: CoreArrayLengthMatcher,
  matchContext: MatchContext,
): AnyData => {
  throw new StripUnsupportedError(matcher, matchContext);
};

const check: CheckMatchFn<CoreArrayLengthMatcher> = (
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
  typeof ARRAY_LENGTH_MATCHER_TYPE,
  CoreArrayLengthMatcher
> = {
  describe: (matcher) =>
    `an array of length min: ${matcher['_case:matcher:minLength']}, max: ${matcher['_case:matcher:maxLength']};`,
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve().then(() => {
      if (
        (matcher['_case:matcher:maxLength'] !==
          ARRAY_LENGTH_PARAMETER_INFINITE &&
          matcher['_case:matcher:maxLength'] < 0) ||
        Number.isNaN(matcher['_case:matcher:maxLength'])
      ) {
        // we don't actually bother to check whether it's an integer,
        // because if someone sets it to 5.4,
        // then we'll still respect the max length
        throw new CaseConfigurationError(
          `Array maximum length was set to the invalid value '${matcher['_case:matcher:maxLength']}'. It must be a positive integer`,
          matchContext,
        );
      }

      if (
        matcher['_case:matcher:minLength'] < 0 ||
        Number.isNaN(matcher['_case:matcher:minLength'])
      ) {
        // we don't actually bother to check whether it's an integer,
        // because if someone sets it to 5.4,
        // then we'll still respect the max length
        throw new CaseConfigurationError(
          `Array minimum length was set to the invalid value '${matcher['_case:matcher:minLength']}'. It must be a positive integer`,
          matchContext,
        );
      }
    }),
};
