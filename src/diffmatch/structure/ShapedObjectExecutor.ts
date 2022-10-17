import { matchingError } from 'entities/results/MatchingError';

import type {
  AnyCaseNodeOrData,
  AnyData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';

import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type {
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from 'entities/executors/types';

const strip: StripMatcherFn<typeof SHAPED_OBJECT_MATCHER_TYPE> = (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext
): AnyData =>
  Object.entries<AnyCaseNodeOrData>(matcher['case:matcher:children'])
    .map(
      ([expectedKey, expectedValueMatcher]: [
        string,
        AnyCaseNodeOrData
      ]): Record<string, AnyData> => ({
        [expectedKey]: matchContext.descendAndStrip(
          expectedValueMatcher,
          addLocation(expectedKey, matchContext)
        ),
      })
    )
    .reduce(
      (acc: Record<string, AnyData>, entry: Record<string, AnyData>) => ({
        ...acc,
        ...entry,
      }),
      {}
    );
const check: CheckMatchFn<typeof SHAPED_OBJECT_MATCHER_TYPE> = async (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => [
  ...(typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null
    ? combineResults(
        (
          await Promise.all(
            Object.entries<AnyCaseNodeOrData>(
              matcher['case:matcher:children']
            ).map(
              ([expectedKey, expectedValueMatcher]: [
                string,
                AnyCaseNodeOrData
              ]): Promise<MatchResult> =>
                expectedKey in actual
                  ? Promise.resolve(
                      matchContext.descendAndCheck(
                        expectedValueMatcher,
                        addLocation(expectedKey, matchContext),
                        (actual as { [k: string]: unknown })[expectedKey]
                      )
                    )
                  : Promise.resolve(
                      makeResults(
                        matchingError(
                          matcher,
                          `missing key '${expectedKey}' in object '${actual}'`,
                          actual,
                          matchContext
                        )
                      )
                    )
            )
          )
        ).flat()
      )
    : makeResults(
        matchingError(
          matcher,
          `'${actual}' is not an object`,
          actual,
          matchContext
        )
      )),
];

export const ShapedObjectExecutor: MatcherExecutor<
  typeof SHAPED_OBJECT_MATCHER_TYPE
> = { check, strip };
