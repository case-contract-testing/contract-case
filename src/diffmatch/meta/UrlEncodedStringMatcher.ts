import { CaseConfigurationError } from '../../entities';
import {
  actualToString,
  makeResults,
  matchingError,
} from '../../entities/results';
import type {
  MatchContext,
  MatchResult,
  AnyData,
  MatcherExecutor,
  URL_ENCODED_STRING_TYPE,
  CoreUrlEncodedStringMatcher,
} from '../../entities/types';

const check = (
  matcher: CoreUrlEncodedStringMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> | MatchResult =>
  typeof actual === 'string'
    ? matchContext.descendAndCheck(
        matcher['case:matcher:child'],
        matchContext,
        decodeURIComponent(actual)
      )
    : makeResults(
        matchingError(
          matcher,
          `${actualToString(
            actual
          )} is not a string; so can't treat it as an encoded URL component`,
          actual,
          matchContext
        )
      );

const strip = (
  matcher: CoreUrlEncodedStringMatcher,
  matchContext: MatchContext
): AnyData => {
  const result = matchContext.descendAndStrip(
    matcher['case:matcher:child'],
    matchContext
  );
  if (typeof result === 'string') return encodeURIComponent(result);
  throw new CaseConfigurationError(
    `Unable to URL encode '${result}' during stripMatchers, as it's not a string and therefore can't be URL encoded`
  );
};

export const UrlEncodedStringMatcher: MatcherExecutor<
  typeof URL_ENCODED_STRING_TYPE
> = {
  describe: (matcher, matchContext) =>
    `uriEncoded string '${matchContext.descendAndDescribe(
      matcher['case:matcher:child'],
      matchContext
    )}'`,
  check,
  strip,
};
