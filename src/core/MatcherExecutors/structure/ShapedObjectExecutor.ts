import { matchingError } from 'core/MatchingError';

import type {
  AnyCaseNodeOrData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'core/nodes/matchers/types';
import type { MatchResult } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchContext } from 'core/context/types';

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
                      matchContext
                    )
                  : Promise.resolve([
                      matchingError(
                        matcher,
                        `missing key '${expectedKey}' in object '${actual}'`,
                        actual
                      ),
                    ])
            )
          )
        ).flat(),
      ]
    : [matchingError(matcher, `'${actual}' is not an object`, actual)]),
];
