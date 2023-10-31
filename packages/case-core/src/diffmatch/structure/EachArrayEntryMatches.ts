import {
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  CoreArrayEachEntryMatches,
  AnyData,
} from '@contract-case/case-entities-internal';
import { addLocation } from '../../entities/context';
import {
  matchingError,
  combineResults,
  makeResults,
} from '../../entities/results';
import type {
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from '../../entities/types';

const strip: StripMatcherFn<typeof ARRAY_EACH_ENTRY_MATCHES_TYPE> = (
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

const check: CheckMatchFn<typeof ARRAY_EACH_ENTRY_MATCHES_TYPE> = async (
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
  typeof ARRAY_EACH_ENTRY_MATCHES_TYPE
> = {
  describe: (matcher, context) =>
    `an array where each entry matches ${context.descendAndDescribe(
      matcher['_case:matcher:matcher'],
      addLocation(`:eachEntryLike`, context),
    )}`,
  check,
  strip,
};
