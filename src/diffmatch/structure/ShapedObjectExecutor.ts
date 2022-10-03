import { matchingError } from 'entities/results/MatchingError';

import type {
  AnyCaseNodeOrData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';
import type { CheckMatchFn, MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';

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
              matcher['case:matcher:example']
            ).map(
              ([expectedKey, expectedValueMatcher]: [
                string,
                AnyCaseNodeOrData
              ]): Promise<MatchResult> =>
                expectedKey in actual
                  ? matchContext.handleNext(
                      expectedValueMatcher,
                      addLocation(expectedKey, matchContext),
                      (actual as { [k: string]: unknown })[expectedKey]
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
> = { check };
