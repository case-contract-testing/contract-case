import { matchingError } from 'core/MatchingError';

import type {
  AnyCaseNodeOrData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
} from 'core/matchers/types';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';
import type { MatchContext } from 'core/context/types';

export const ShapedObjectExecutor: MatcherExecutor<
  typeof SHAPED_OBJECT_MATCHER_TYPE
> = (
  matcher: CoreShapedObjectMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => [
  ...(typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null
    ? [
        ...Object.entries<AnyCaseNodeOrData>(matcher['case:matcher:example'])
          .map(
            ([expectedKey, expectedValueMatcher]: [
              string,
              AnyCaseNodeOrData
            ]): Array<MatchingError> =>
              expectedKey in actual
                ? matchContext.handleNext(
                    expectedValueMatcher,
                    (actual as { [k: string]: unknown })[expectedKey],
                    matchContext
                  )
                : [
                    matchingError(
                      matcher,
                      `missing key '${expectedKey}' in object '${actual}'`,
                      actual
                    ),
                  ]
          )
          .flat(),
      ]
    : [matchingError(matcher, `'${actual}' is not an object`, actual)]),
];
