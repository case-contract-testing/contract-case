import { matchingError } from 'entities/results/MatchingError';

import { addLocation } from 'entities/context';
import {
  combineResults,
  makeNoErrorResult,
  makeResults,
} from 'entities/results/MatchResult';
import type {
  AnyData,
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from 'entities/types';

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
          actual.length >= matcher['case:matcher:children'].length
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
                  `Array has different lengths - expected at least '${matcher['case:matcher:children'].length}' elements, but found only '${actual.length} elements`,
                  actual,
                  matchContext
                )
              ),
          matcher['case:matcher:children'].length === 0 && actual.length !== 0
            ? makeResults(
                matchingError(
                  matcher,
                  `Expected an empty array, but instead found ${actual.length} elements`,
                  actual,
                  matchContext
                )
              )
            : makeNoErrorResult()
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
