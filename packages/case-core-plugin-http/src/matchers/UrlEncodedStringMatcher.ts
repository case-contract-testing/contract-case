import {
  CoreUrlEncodedStringMatcher,
  URL_ENCODED_STRING_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  MatchContext,
  MatchResult,
  addLocation,
  makeResults,
  matchingError,
  actualToString,
  CaseConfigurationError,
  MatcherExecutor,
  mustResolveToString,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const check = (
  matcher: CoreUrlEncodedStringMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult =>
  typeof actual === 'string'
    ? matchContext.descendAndCheck(
        matcher['_case:matcher:child'],
        addLocation(':urlEncoded', matchContext),
        decodeURIComponent(actual),
      )
    : makeResults(
        matchingError(
          matcher,
          `${actualToString(
            actual,
          )} is not a string; so can't treat it as an encoded URL component`,
          actual,
          matchContext,
        ),
      );

const strip = (
  matcher: CoreUrlEncodedStringMatcher,
  matchContext: MatchContext,
): AnyData => {
  const result = matchContext.descendAndStrip(
    matcher['_case:matcher:child'],
    addLocation(':urlEncoded', matchContext),
  );
  if (typeof result === 'string') return encodeURIComponent(result);
  throw new CaseConfigurationError(
    `Unable to URL encode '${result}' during stripMatchers, as it's not a string and therefore can't be URL encoded`,
  );
};

export const UrlEncodedStringMatcher: MatcherExecutor<
  typeof URL_ENCODED_STRING_TYPE,
  CoreUrlEncodedStringMatcher
> = {
  describe: (matcher, matchContext) =>
    `uriEncoded string '${matchContext.descendAndDescribe(
      matcher['_case:matcher:child'],
      addLocation(':urlEncoded', matchContext),
    )}'`,
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve().then(() => {
      const encodedString = mustResolveToString(
        matcher['_case:matcher:child'],
        addLocation(':urlEncoded', matchContext),
      );
      try {
        decodeURIComponent(encodedString);
      } catch (e) {
        throw new CaseConfigurationError(
          `The provided string example failed to decode as a URI: ${(e as Error).message}`,
        );
      }
    }),
};
