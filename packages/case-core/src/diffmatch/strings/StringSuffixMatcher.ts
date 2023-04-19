import {
  CoreStringSuffixMatcher,
  STRING_SUFFIX_TYPE,
} from '@contract-case/case-entities-internal';
import { mustResolveToString } from '../../entities';
import { addLocation } from '../../entities/context';
import { makeResults, matchingError } from '../../entities/results';
import type {
  MatchContext,
  MatchResult,
  MatcherExecutor,
} from '../../entities/types';

const check = async (
  matcher: CoreStringSuffixMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext
      )
    );
  }

  return actual.endsWith(matcher['_case:matcher:suffix'])
    ? matchContext.descendAndCheck(
        matcher['_case:matcher:prefix'],
        addLocation(':suffix', matchContext),
        actual.substring(
          0,
          actual.length - matcher['_case:matcher:suffix'].length
        )
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not end with the expected suffix '${matcher['_case:matcher:suffix']}'`,
          actual,
          matchContext
        )
      );
};

export const StringSuffixMatcher: MatcherExecutor<typeof STRING_SUFFIX_TYPE> = {
  describe: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `"${matchContext
      .descendAndDescribe(
        matcher['_case:matcher:prefix'],
        addLocation(':suffix', matchContext)
      )
      .replace(/^"+|"+$/g, '')}${matcher['_case:matcher:suffix']}"`,
  check,
  strip: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `${mustResolveToString(
      matcher['_case:matcher:prefix'],
      addLocation(':suffix', matchContext)
    )}${matcher['_case:matcher:suffix']}`,
};
