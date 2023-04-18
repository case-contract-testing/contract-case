import { mustResolveToString, StripUnsupportedError } from '../../entities';
import {
  combineResults,
  errorWhen,
  matchingError,
  makeResults,
} from '../../entities/results';
import type {
  CoreStringContainsMatcher,
  MatchContext,
  MatchResult,
  MatcherExecutor,
  STRING_CONTAINS_TYPE,
} from '../../entities/types';

const check = async (
  matcher: CoreStringContainsMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => {
  const expectedInclusion = mustResolveToString(
    matcher['_case:matcher:contains'],
    matchContext
  );
  return combineResults(
    typeof actual === 'string'
      ? errorWhen(
          !actual.includes(expectedInclusion),
          matchingError(
            matcher,
            `The string '${actual}' did not include the expected substring '${expectedInclusion}'`,
            actual,
            matchContext
          )
        )
      : makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not a string`,
            actual,
            matchContext
          )
        )
  );
};

export const StringContainsMatcher: MatcherExecutor<
  typeof STRING_CONTAINS_TYPE
> = {
  describe: (matcher: CoreStringContainsMatcher, matchContext) =>
    `a string containing "${mustResolveToString(
      matcher['_case:matcher:contains'],
      matchContext
    ).replace(/^"+|"+$/g, '')}"`,
  check,
  strip: (matcher: CoreStringContainsMatcher, matchContext) => {
    if ('_case:matcher:example' in matcher) {
      return matcher['_case:matcher:example'];
    }
    throw new StripUnsupportedError(matcher, matchContext);
  },
};
