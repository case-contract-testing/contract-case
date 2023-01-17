import type { MatchContext } from 'entities/context/types';

import { addLocation } from 'entities/context';
import type {
  AnyData,
  LookupableMatcher,
  LOOKUP_MATCHER_TYPE,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from 'entities/types';

const getMatcher = (matcher: LookupableMatcher, matchContext: MatchContext) => {
  if ('case:matcher:child' in matcher) {
    matchContext.saveLookupableMatcher(matcher);
  }
  return matchContext.lookupMatcher(matcher['case:matcher:uniqueName']);
};

const strip: StripMatcherFn<typeof LOOKUP_MATCHER_TYPE> = (
  matcher: LookupableMatcher,
  matchContext: MatchContext
): AnyData =>
  matchContext.descendAndStrip(
    getMatcher(matcher, matchContext),
    addLocation(`[${matcher['case:matcher:uniqueName']}]`, matchContext)
  );

const check: CheckMatchFn<typeof LOOKUP_MATCHER_TYPE> = async (
  matcher: LookupableMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> =>
  matchContext.descendAndCheck(
    getMatcher(matcher, matchContext),
    addLocation(`[${matcher['case:matcher:uniqueName']}]`, matchContext),
    actual
  );

export const LookupMatcher: MatcherExecutor<typeof LOOKUP_MATCHER_TYPE> = {
  describe: (matcher: LookupableMatcher, matchContext: MatchContext) =>
    matchContext.descendAndDescribe(
      getMatcher(matcher, matchContext),
      addLocation(`[${matcher['case:matcher:uniqueName']}]`, matchContext)
    ),
  check,
  strip,
};
