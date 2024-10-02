import {
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  CoreArrayEachEntryMatches,
} from '@contract-case/case-entities-internal';
import {
  StripMatcherFn,
  MatchContext,
  addLocation,
  CheckMatchFn,
  MatchResult,
  combineResults,
  makeResults,
  matchingError,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const strip: StripMatcherFn<CoreArrayEachEntryMatches> = (
  matcher: CoreArrayEachEntryMatches,
  matchContext: MatchContext,
): AnyData =>
  '_case:matcher:example' in matcher
    ? matchContext.descendAndStrip(
        matcher['_case:matcher:example'],
        addLocation(`:eachEntryLike[example]`, matchContext),
      )
    : [
        matchContext.descendAndStrip(
          matcher['_case:matcher:matcher'],
          addLocation(`:eachEntryLike[matcher]`, matchContext),
        ),
      ];

const check: CheckMatchFn<CoreArrayEachEntryMatches> = async (
  matcher: CoreArrayEachEntryMatches,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          actual.length !== 0
            ? (
                await Promise.all(
                  actual
                    .map((actualEntry, index) =>
                      matchContext.descendAndCheck(
                        matcher['_case:matcher:matcher'],
                        addLocation(`:eachEntryLike[${index}]`, matchContext),
                        actualEntry,
                      ),
                    )
                    .flat(),
                )
              ).flat()
            : makeResults(
                matchingError(
                  matcher,
                  `Expected a non-empty array. It's not valid to use eachArrayEntryMatches for empty arrays. See the documentation for more details:\n\n   https://case.contract-testing.io/docs/faq#how-do-i-test-an-array-field-that-might-have-zero-items-in-it`,
                  actual,
                  matchContext,
                ),
              ),
        )
      : makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not an array`,
            actual,
            matchContext,
          ),
        ),
  );

export const EachArrayEntryMatches: MatcherExecutor<
  typeof ARRAY_EACH_ENTRY_MATCHES_TYPE,
  CoreArrayEachEntryMatches
> = {
  describe: (matcher, context) =>
    `an array where each entry matches ${context.descendAndDescribe(
      matcher['_case:matcher:matcher'],
      addLocation(`:eachEntryLike`, context),
    )}`,
  check,
  strip,
};
