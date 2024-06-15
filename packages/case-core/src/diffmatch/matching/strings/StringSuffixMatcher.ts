import {
  CoreStringSuffixMatcher,
  STRING_SUFFIX_TYPE,
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
  matcher: CoreStringSuffixMatcher,
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

  return actual.endsWith(matcher['_case:matcher:suffix'])
    ? matchContext.descendAndCheck(
        matcher['_case:matcher:prefix'],
        addLocation(':suffix', matchContext),
        actual.substring(
          0,
          actual.length - matcher['_case:matcher:suffix'].length,
        ),
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not end with the expected suffix '${matcher['_case:matcher:suffix']}'`,
          actual,
          matchContext,
        ),
      );
};

export const StringSuffixMatcher: MatcherExecutor<
  typeof STRING_SUFFIX_TYPE,
  CoreStringSuffixMatcher
> = {
  describe: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `"${matchContext
      .descendAndDescribe(
        matcher['_case:matcher:prefix'],
        addLocation(':suffix', matchContext),
      )
      .replace(/^"+|"+$/g, '')}${matcher['_case:matcher:suffix']}"`,
  check,
  strip: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `${mustResolveToString(
      matcher['_case:matcher:prefix'],
      addLocation(':suffix', matchContext),
    )}${matcher['_case:matcher:suffix']}`,
};
