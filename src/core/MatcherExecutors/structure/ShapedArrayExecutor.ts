import { errorWhen, matchingError } from 'core/MatchingError';

import type { MatchContext } from 'core/context/types';
import type {
  CoreShapedArrayMatcher,
  SHAPED_ARRAY_MATCHER_TYPE,
} from 'core/matchers/types';
import type { MatchingError } from 'core/types';
import type { MatcherExecutor } from 'core/MatcherExecutors/types';

export const ShapedArrayExecutor: MatcherExecutor<
  typeof SHAPED_ARRAY_MATCHER_TYPE
> = (
  matcher: CoreShapedArrayMatcher,
  actual: unknown,
  matchContext: MatchContext
): Array<MatchingError> => [
  ...errorWhen(
    !Array.isArray(actual),
    matchingError(matcher, `'${typeof actual}' is not an array`, actual)
  ),
  ...(Array.isArray(actual)
    ? [
        ...errorWhen(
          Array.isArray(actual) &&
            actual.length !== matcher['case:matcher:example'].length,
          matchingError(
            matcher,
            `Array has different lengths - expected '${
              matcher['case:matcher:example'].length
            }', but was '${
              Array.isArray(actual) ? actual.length : 'not an array'
            }'`,
            actual
          )
        ),
        ...(actual.length === matcher['case:matcher:example'].length
          ? matcher['case:matcher:example']
              .map((expectedChild, index) =>
                matchContext.handleNext(
                  expectedChild,
                  actual[index],
                  matchContext
                )
              )
              .flat()
          : []),
      ]
    : []),
];
