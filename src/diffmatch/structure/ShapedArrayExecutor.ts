import { matchingError } from 'entities/results/MatchingError';

import type { MatchContext } from 'entities/context/types';
import type {
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';
import type { MatcherExecutor } from 'diffmatch/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';

export const ShapedArrayExecutor: MatcherExecutor<
  typeof SHAPED_ARRAY_MATCHER_TYPE
> = async (
  matcher: CoreShapedArrayMatcher,
  actual: unknown,
  matchContext: MatchContext
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          actual.length === matcher['case:matcher:example'].length
            ? (
                await Promise.all(
                  matcher['case:matcher:example']
                    .map((expectedChild, index) =>
                      matchContext.handleNext(
                        expectedChild,
                        actual[index],
                        addLocation(`[${index}]`, matchContext)
                      )
                    )
                    .flat()
                )
              ).flat()
            : makeResults(
                matchingError(
                  matcher,
                  `Array has different lengths - expected '${
                    matcher['case:matcher:example'].length
                  }', but was '${
                    Array.isArray(actual) ? actual.length : 'not an array'
                  }'`,
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
