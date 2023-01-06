import { matchingError } from 'entities/results/MatchingError';

import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type {
  AnyData,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
  ARRAY_EACH_ENTRY_MATCHES,
  CoreArrayEachEntryMatches,
} from 'entities/types';

const strip: StripMatcherFn<typeof ARRAY_EACH_ENTRY_MATCHES> = (
  matcher: CoreArrayEachEntryMatches,
  matchContext: MatchContext
): AnyData =>
  'case:matcher:example' in matcher
    ? matchContext.descendAndStrip(
        matcher['case:matcher:example'],
        addLocation(`:eachEntryLike[example]`, matchContext)
      )
    : [
        matchContext.descendAndStrip(
          matcher['case:matcher:matcher'],
          addLocation(`:eachEntryLike[matcher]`, matchContext)
        ),
      ];

const check: CheckMatchFn<typeof ARRAY_EACH_ENTRY_MATCHES> = async (
  matcher: CoreArrayEachEntryMatches,
  matchContext: MatchContext,
  actual: unknown
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
                        matcher['case:matcher:matcher'],
                        addLocation(`:eachEntryLike[${index}]`, matchContext),
                        actualEntry
                      )
                    )
                    .flat()
                )
              ).flat()
            : makeResults(
                matchingError(
                  matcher, // TODO: Documentation links
                  `Expected a non-empty array. It's not valid to use eachArrayEntryMatches for empty arrays. See the documentation for more details`,
                  actual,
                  matchContext
                )
              )
        )
      : makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not an array`,
            actual,
            matchContext
          )
        )
  );

export const EachArrayEntryMatches: MatcherExecutor<
  typeof ARRAY_EACH_ENTRY_MATCHES
> = { check, strip };
