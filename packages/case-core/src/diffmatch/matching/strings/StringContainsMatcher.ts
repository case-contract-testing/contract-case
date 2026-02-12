import {
  CoreStringContainsMatcher,
  STRING_CONTAINS_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  MatchResult,
  mustResolveToString,
  combineResults,
  errorWhen,
  matchingError,
  makeResults,
  MatcherExecutor,
  StripUnsupportedError,
  addLocation,
  CaseConfigurationError,
  describeMessage,
} from '@contract-case/case-plugin-base';

const check = async (
  matcher: CoreStringContainsMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  const expectedInclusion = mustResolveToString(
    matcher['_case:matcher:contains'],
    matchContext,
  );
  return combineResults(
    typeof actual === 'string'
      ? errorWhen(
          !actual.includes(expectedInclusion),
          matchingError(
            matcher,
            `The string '${actual}' did not include the expected substring '${expectedInclusion}'`,
            actual,
            matchContext,
          ),
        )
      : makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not a string`,
            actual,
            matchContext,
          ),
        ),
  );
};

export const StringContainsMatcher: MatcherExecutor<
  typeof STRING_CONTAINS_TYPE,
  CoreStringContainsMatcher
> = {
  describe: (matcher: CoreStringContainsMatcher, matchContext) =>
    describeMessage(
      `a string containing "${mustResolveToString(
        matcher['_case:matcher:contains'],
        matchContext,
      ).replace(/^"+|"+$/g, '')}"`,
    ),
  check,
  strip: (matcher: CoreStringContainsMatcher, matchContext) => {
    if ('_case:matcher:example' in matcher) {
      return matcher['_case:matcher:example'];
    }
    throw new StripUnsupportedError(matcher, matchContext);
  },
  validate: (matcher, matchContext) =>
    Promise.resolve().then(() => {
      if (
        '_case:matcher:example' in matcher &&
        typeof matcher['_case:matcher:example'] !== 'string'
      ) {
        throw new CaseConfigurationError(
          `The example provided to the string contains matcher was of type '${typeof matcher['_case:matcher:example']}' instead of string`,
          matchContext,
        );
      }

      return matchContext.descendAndValidate(
        matcher['_case:matcher:contains'],
        addLocation(':stringContains', matchContext),
      );
    }),
};
