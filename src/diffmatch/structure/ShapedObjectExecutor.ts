import { matchingError } from 'entities/results/MatchingError';

import type {
  AnyCaseNodeOrData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';
import type { MatcherExecutor } from 'diffmatch/types';
import type { MatchContext } from 'entities/context/types';
import { addLocation } from 'entities/context';

export const ShapedObjectExecutor: MatcherExecutor<
  typeof SHAPED_OBJECT_MATCHER_TYPE
> = async (
  matcher: CoreShapedObjectMatcher,
  actual: unknown,
  matchContext: MatchContext
): Promise<MatchResult> => [
  ...(typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null
    ? [
        ...(
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
                      (actual as { [k: string]: unknown })[expectedKey],
                      addLocation(expectedKey, matchContext)
                    )
                  : Promise.resolve([
                      matchingError(
                        matcher,
                        `missing key '${expectedKey}' in object '${actual}'`,
                        actual,
                        matchContext
                      ),
                    ])
            )
          )
        ).flat(),
      ]
    : [
        matchingError(
          matcher,
          `'${actual}' is not an object`,
          actual,
          matchContext
        ),
      ]),
];
