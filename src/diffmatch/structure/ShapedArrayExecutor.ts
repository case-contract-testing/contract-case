import { matchingError } from 'entities/results/MatchingError';

import type { MatchContext } from 'entities/context/types';
import type {
  AnyData,
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
} from 'entities/nodes/matchers/types';
import type { MatchResult } from 'entities/types';
import type {
  CheckMatchFn,
  MatcherExecutor,
  StripMatcherFn,
} from 'diffmatch/types';
import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';

const strip: StripMatcherFn<typeof SHAPED_ARRAY_MATCHER_TYPE> = (
  matcher: CoreShapedArrayMatcher,
  matchContext: MatchContext
): AnyData =>
  matcher['case:matcher:children'].map((expectedChild, index) =>
    matchContext.descendAndStrip(
      expectedChild,
      addLocation(`[${index}]`, matchContext)
    )
  );

const check: CheckMatchFn<typeof SHAPED_ARRAY_MATCHER_TYPE> = async (
  matcher: CoreShapedArrayMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          actual.length === matcher['case:matcher:children'].length
            ? (
                await Promise.all(
                  matcher['case:matcher:children']
                    .map((expectedChild, index) =>
                      matchContext.descendAndCheck(
                        expectedChild,
                        addLocation(`[${index}]`, matchContext),
                        actual[index]
                      )
                    )
                    .flat()
                )
              ).flat()
            : makeResults(
                matchingError(
                  matcher,
                  `Array has different lengths - expected '${
                    matcher['case:matcher:children'].length
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

export const ShapedArrayExecutor: MatcherExecutor<
  typeof SHAPED_ARRAY_MATCHER_TYPE
> = { check, strip };
