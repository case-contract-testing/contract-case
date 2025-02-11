import {
  MatchContext,
  StripMatcherFn,
  addLocation,
  CheckMatchFn,
  MatchResult,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import {
  LookupableMatcher,
  AnyData,
  LOOKUP_MATCHER_TYPE,
} from '@contract-case/case-plugin-dsl-types';

const getMatcher = (matcher: LookupableMatcher, matchContext: MatchContext) => {
  if (
    '_case:matcher:child' in matcher &&
    matcher['_case:matcher:child'] !== undefined
  ) {
    matchContext.saveLookupableMatcher(matcher);
  }
  return matchContext.lookupMatcher(matcher['_case:matcher:uniqueName']);
};

const strip: StripMatcherFn<LookupableMatcher> = (
  matcher: LookupableMatcher,
  matchContext: MatchContext,
): AnyData =>
  matchContext.descendAndStrip(
    getMatcher(matcher, matchContext),
    addLocation(
      `:lookup[${matcher['_case:matcher:uniqueName']}]`,
      matchContext,
    ),
  );

const check: CheckMatchFn<LookupableMatcher> = async (
  matcher: LookupableMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  matchContext.descendAndCheck(
    getMatcher(matcher, matchContext),
    addLocation(
      `:lookup[${matcher['_case:matcher:uniqueName']}]`,
      matchContext,
    ),
    actual,
  );

export const LookupMatcher: MatcherExecutor<
  typeof LOOKUP_MATCHER_TYPE,
  LookupableMatcher
> = {
  describe: (matcher: LookupableMatcher, matchContext: MatchContext) =>
    matchContext.descendAndDescribe(
      getMatcher(matcher, matchContext),
      addLocation(
        `:lookup[${matcher['_case:matcher:uniqueName']}]`,
        matchContext,
      ),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve().then(() =>
      matchContext.descendAndValidate(
        getMatcher(matcher, matchContext),
        addLocation(
          `:lookup[${matcher['_case:matcher:uniqueName']}]`,
          matchContext,
        ),
      ),
    ),
};
