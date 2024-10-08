import {
  CoreStringPrefixMatcher,
  STRING_PREFIX_TYPE,
} from '@contract-case/case-entities-internal';
import {
  MatchContext,
  MatchResult,
  makeResults,
  matchingError,
  addLocation,
  MatcherExecutor,
  mustResolveToString,
} from '@contract-case/case-plugin-base';

const check = async (
  matcher: CoreStringPrefixMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext,
      ),
    );
  }

  return actual.startsWith(matcher['_case:matcher:prefix'])
    ? matchContext.descendAndCheck(
        matcher['_case:matcher:suffix'],
        addLocation(':prefix', matchContext),
        actual.slice(matcher['_case:matcher:prefix'].length),
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not start with the expected prefix '${matcher['_case:matcher:prefix']}'`,
          actual,
          matchContext,
        ),
      );
};

export const StringPrefixMatcher: MatcherExecutor<
  typeof STRING_PREFIX_TYPE,
  CoreStringPrefixMatcher
> = {
  describe: (matcher: CoreStringPrefixMatcher, matchContext) =>
    `"${matcher['_case:matcher:prefix']}${matchContext
      .descendAndDescribe(
        matcher['_case:matcher:suffix'],
        addLocation(':prefix', matchContext),
      )
      .replace(/^"+|"+$/g, '')}"`,
  check,
  strip: (matcher: CoreStringPrefixMatcher, matchContext) =>
    `${matcher['_case:matcher:prefix']}${mustResolveToString(
      matcher['_case:matcher:suffix'],
      addLocation(':suffix', matchContext),
    )}`,
};
