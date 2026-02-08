import {
  CoreObjectKeysMatcher,
  OBJECT_KEYS_MATCH_TYPE,
} from '@contract-case/case-entities-internal';
import {
  StripMatcherFn,
  MatchContext,
  addLocation,
  CheckMatchFn,
  MatchResult,
  combineResults,
  makeResults,
  matchingError,
  MatcherExecutor,
  describeConcat,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';
import { isObject, whyNotAnObject } from './internals/objectTests';

const strip: StripMatcherFn<CoreObjectKeysMatcher> = (
  matcher: CoreObjectKeysMatcher,
  matchContext: MatchContext,
): AnyData =>
  '_case:matcher:exampleKey' in matcher
    ? matchContext.descendAndStrip(
        matcher['_case:matcher:exampleKey'],
        addLocation(`:objectEachKeyLike[example]`, matchContext),
      )
    : {
        [`${matchContext.descendAndStrip(
          matcher['_case:matcher:matcher'],
          addLocation(`:objectEachKeyLike[matcher]`, matchContext),
        )}`]: 'someValue',
      };

const check: CheckMatchFn<CoreObjectKeysMatcher> = async (
  matcher: CoreObjectKeysMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => [
  ...(isObject(actual)
    ? combineResults(
        Object.keys(actual).length === 0
          ? makeResults(
              matchingError(
                matcher, // TODO: Add documentation
                `Expected an object with at least one key property. It's not valid to use objectEachKeyMatches for empty objects. See the documentation for more details`,
                actual,
                matchContext,
              ),
            )
          : (
              await Promise.all(
                Object.keys(actual).map(
                  (actualKey): Promise<MatchResult> =>
                    Promise.resolve(
                      matchContext.descendAndCheck(
                        matcher['_case:matcher:matcher'],
                        addLocation(actualKey, matchContext),
                        actualKey,
                      ),
                    ),
                ),
              )
            ).flat(),
      )
    : makeResults(
        matchingError(matcher, whyNotAnObject(actual), actual, matchContext),
      )),
];

export const ObjectEachKeyMatches: MatcherExecutor<
  typeof OBJECT_KEYS_MATCH_TYPE,
  CoreObjectKeysMatcher
> = {
  describe: (matcher, context) =>
    describeConcat(
      describeMessage('an object where each key is '),
      context.descendAndDescribe(
        matcher['_case:matcher:matcher'],
        addLocation(':eachKeyLike', context),
      ),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    matchContext.descendAndValidate(
      matcher['_case:matcher:matcher'],
      addLocation(`:eachKeyLike`, matchContext),
    ),
};
