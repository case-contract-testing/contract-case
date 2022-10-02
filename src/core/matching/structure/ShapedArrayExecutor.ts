import { matchingError } from 'core/MatchingError';

import type { MatchContext } from 'core/context/types';
import type {
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
} from 'core/nodes/matchers/types';
import type { MatchResult } from 'core/types';
import type { MatcherExecutor } from 'core/matching/types';

export const ShapedArrayExecutor: MatcherExecutor<
  typeof SHAPED_ARRAY_MATCHER_TYPE
> = async (
  matcher: CoreShapedArrayMatcher,
  actual: unknown,
  matchContext: MatchContext
): Promise<MatchResult> => [
  ...(Array.isArray(actual)
    ? [
        ...(actual.length === matcher['case:matcher:example'].length
          ? (
              await Promise.all(
                matcher['case:matcher:example']
                  .map((expectedChild, index) =>
                    matchContext.handleNext(
                      expectedChild,
                      actual[index],
                      matchContext
                    )
                  )
                  .flat()
              )
            ).flat()
          : [
              matchingError(
                matcher,
                `Array has different lengths - expected '${
                  matcher['case:matcher:example'].length
                }', but was '${
                  Array.isArray(actual) ? actual.length : 'not an array'
                }'`,
                actual
              ),
            ]),
      ]
    : [matchingError(matcher, `'${typeof actual}' is not an array`, actual)]),
];
