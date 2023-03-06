import { mustResolveToString } from '../../entities';
import { addLocation } from '../../entities/context';
import { makeResults, matchingError } from '../../entities/results';
import type {
  CoreStringPrefixMatcher,
  MatchContext,
  MatchResult,
  MatcherExecutor,
  STRING_PREFIX_TYPE,
} from '../../entities/types';

const check = async (
  matcher: CoreStringPrefixMatcher,
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

  return actual.startsWith(matcher['case:matcher:prefix'])
    ? matchContext.descendAndCheck(
        matcher['case:matcher:suffix'],
        addLocation(':prefix', matchContext),
        actual.slice(matcher['case:matcher:prefix'].length)
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not start with the expected prefix '${matcher['case:matcher:prefix']}'`,
          actual,
          matchContext
        )
      );
};

export const StringPrefixMatcher: MatcherExecutor<typeof STRING_PREFIX_TYPE> = {
  describe: (matcher: CoreStringPrefixMatcher, matchContext) =>
    `"${matcher['case:matcher:prefix']}${matchContext
      .descendAndDescribe(
        matcher['case:matcher:suffix'],
        addLocation(':prefix', matchContext)
      )
      .replace(/^"+|"+$/g, '')}"`,
  check,
  strip: (matcher: CoreStringPrefixMatcher, matchContext) =>
    `${matcher['case:matcher:prefix']}${mustResolveToString(
      matcher['case:matcher:suffix'],
      addLocation(':prefix', matchContext)
    )}`,
};
