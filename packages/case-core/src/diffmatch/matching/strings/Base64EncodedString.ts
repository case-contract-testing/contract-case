import {
  CoreBase64EncodedMatcher,
  BASE64_ENCODED_TYPE,
} from '@contract-case/case-entities-internal';
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
  describeConcat,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const check = (
  matcher: CoreBase64EncodedMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> | MatchResult => {
  if (typeof actual === 'string') {
    if (
      actual.match(
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/,
      ) !== null
    ) {
      return matchContext.descendAndCheck(
        matcher['_case:matcher:child'],
        addLocation(':base64', matchContext),
        Buffer.from(actual, 'base64').toString(),
      );
    }
    return makeResults(
      matchingError(
        matcher,
        `${actualToString(actual)} is not a base64 encoded string`,
        actual,
        matchContext,
      ),
    );
  }
  return makeResults(
    matchingError(
      matcher,
      `${actualToString(
        actual,
      )} is not a string; so it can't match a base64 encoded string`,
      actual,
      matchContext,
    ),
  );
};

const strip = (
  matcher: CoreBase64EncodedMatcher,
  matchContext: MatchContext,
): AnyData => {
  const result = matchContext.descendAndStrip(
    matcher['_case:matcher:child'],
    addLocation(':base64', matchContext),
  );
  if (typeof result === 'string') return Buffer.from(result).toString('base64');
  throw new CaseConfigurationError(
    `Unable to base64 encode '${result}' during stripMatchers, as it's not a string and therefore can't be base64 encoded`,
    matchContext,
    'BAD_INTERACTION_DEFINITION',
  );
};

export const Base64EncodedStringMatcher: MatcherExecutor<
  typeof BASE64_ENCODED_TYPE,
  CoreBase64EncodedMatcher
> = {
  describe: (matcher, matchContext) =>
    describeConcat(
      describeMessage("base64 encoded string '"),
      matchContext.descendAndDescribe(
        matcher['_case:matcher:child'],
        addLocation(':base64', matchContext),
      ),
      describeMessage("'"),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve().then(() => {
      const encodedString = mustResolveToString(
        matcher,
        addLocation(':base64', matchContext),
      );
      try {
        Buffer.from(encodedString, 'base64').toString();
      } catch (e) {
        throw new CaseConfigurationError(
          `The provided string example failed to decode as base64: ${(e as Error).message}`,
          matchContext,
          'BAD_INTERACTION_DEFINITION',
        );
      }
    }),
};
