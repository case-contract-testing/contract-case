import { matchingError } from 'entities/results/MatchingError';

import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import type {
  AnyData,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
  OBJECT_VALUES_MATCH_TYPE,
  CoreObjectValuesMatch,
} from 'entities/types';
import { isObject, whyNotAnObject } from './internals/objectTests';

const strip: StripMatcherFn<typeof OBJECT_VALUES_MATCH_TYPE> = (
  matcher: CoreObjectValuesMatch,
  matchContext: MatchContext
): AnyData =>
  'case:matcher:example' in matcher
    ? matchContext.descendAndStrip(
        matcher['case:matcher:example'],
        addLocation(`:objectEachValueLike[example]`, matchContext)
      )
    : {
        someKey: matchContext.descendAndStrip(
          matcher['case:matcher:matcher'],
          addLocation(`:objectEachValueLike[matcher]`, matchContext)
        ),
      };

const check: CheckMatchFn<typeof OBJECT_VALUES_MATCH_TYPE> = async (
  matcher: CoreObjectValuesMatch,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => [
  ...(isObject(actual)
    ? combineResults(
        Object.entries(actual).length === 0
          ? makeResults(
              matchingError(
                matcher, // TODO: Add documentation
                `Expected an object with at least one key property. It's not valid to use objectEachValueMatches for empty objects. See the documentation for more details`,
                actual,
                matchContext
              )
            )
          : (
              await Promise.all(
                Object.entries(actual).map(
                  ([actualKey, actualValue]): Promise<MatchResult> =>
                    Promise.resolve(
                      matchContext.descendAndCheck(
                        matcher['case:matcher:matcher'],
                        addLocation(actualKey, matchContext),
                        actualValue
                      )
                    )
                )
              )
            ).flat()
      )
    : makeResults(
        matchingError(matcher, whyNotAnObject(actual), actual, matchContext)
      )),
];

export const ObjectEachValueMatches: MatcherExecutor<
  typeof OBJECT_VALUES_MATCH_TYPE
> = {
  describe: (matcher, context) =>
    `an object where each value is ${context.descendAndDescribe(
      matcher['case:matcher:matcher'],
      addLocation(':eachValueLike', context)
    )}`,
  check,
  strip,
};
