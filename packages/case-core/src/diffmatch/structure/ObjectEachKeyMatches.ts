import { addLocation } from '../../entities/context';
import {
  combineResults,
  makeResults,
  matchingError,
} from '../../entities/results';
import type {
  StripMatcherFn,
  OBJECT_KEYS_MATCH_TYPE,
  CoreObjectKeysMatcher,
  MatchContext,
  AnyData,
  CheckMatchFn,
  MatchResult,
  MatcherExecutor,
} from '../../entities/types';
import { isObject, whyNotAnObject } from './internals/objectTests';

const strip: StripMatcherFn<typeof OBJECT_KEYS_MATCH_TYPE> = (
  matcher: CoreObjectKeysMatcher,
  matchContext: MatchContext
): AnyData =>
  'case:matcher:exampleKey' in matcher
    ? matchContext.descendAndStrip(
        matcher['case:matcher:exampleKey'],
        addLocation(`:objectEachKeyLike[example]`, matchContext)
      )
    : {
        [`${matchContext.descendAndStrip(
          matcher['case:matcher:matcher'],
          addLocation(`:objectEachKeyLike[matcher]`, matchContext)
        )}`]: 'someValue',
      };

const check: CheckMatchFn<typeof OBJECT_KEYS_MATCH_TYPE> = async (
  matcher: CoreObjectKeysMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => [
  ...(isObject(actual)
    ? combineResults(
        Object.keys(actual).length === 0
          ? makeResults(
              matchingError(
                matcher, // TODO: Add documentation
                `Expected an object with at least one key property. It's not valid to use objectEachKeyMatches for empty objects. See the documentation for more details`,
                actual,
                matchContext
              )
            )
          : (
              await Promise.all(
                Object.keys(actual).map(
                  (actualKey): Promise<MatchResult> =>
                    Promise.resolve(
                      matchContext.descendAndCheck(
                        matcher['case:matcher:matcher'],
                        addLocation(actualKey, matchContext),
                        actualKey
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

export const ObjectEachKeyMatches: MatcherExecutor<
  typeof OBJECT_KEYS_MATCH_TYPE
> = {
  describe: (matcher, context) =>
    `an object where each key is ${context.descendAndDescribe(
      matcher['case:matcher:matcher'],
      addLocation(':eachKeyLike', context)
    )}`,
  check,
  strip,
};
