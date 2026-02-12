import {
  OBJECT_VALUES_MATCH_TYPE,
  CoreObjectValuesMatch,
  CaseNodeFor,
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
  concatenateDescribe,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';
import { isObject, whyNotAnObject } from './internals/objectTests';

const strip: StripMatcherFn<CaseNodeFor<typeof OBJECT_VALUES_MATCH_TYPE>> = (
  matcher: CoreObjectValuesMatch,
  matchContext: MatchContext,
): AnyData =>
  '_case:matcher:example' in matcher
    ? matchContext.descendAndStrip(
        matcher['_case:matcher:example'],
        addLocation(`:objectEachValueLike[example]`, matchContext),
      )
    : {
        someKey: matchContext.descendAndStrip(
          matcher['_case:matcher:matcher'],
          addLocation(`:objectEachValueLike[matcher]`, matchContext),
        ),
      };

const check: CheckMatchFn<CoreObjectValuesMatch> = async (
  matcher: CoreObjectValuesMatch,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => [
  ...(isObject(actual)
    ? combineResults(
        Object.entries(actual).length === 0
          ? makeResults(
              matchingError(
                matcher, // TODO: Add documentation
                `Expected an object with at least one key property. It's not valid to use objectEachValueMatches for empty objects. See the documentation for more details`,
                actual,
                matchContext,
              ),
            )
          : (
              await Promise.all(
                Object.entries(actual).map(
                  ([actualKey, actualValue]): Promise<MatchResult> =>
                    Promise.resolve(
                      matchContext.descendAndCheck(
                        matcher['_case:matcher:matcher'],
                        addLocation(actualKey, matchContext),
                        actualValue,
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

export const ObjectEachValueMatches: MatcherExecutor<
  typeof OBJECT_VALUES_MATCH_TYPE,
  CoreObjectValuesMatch
> = {
  describe: (matcher, context) =>
    concatenateDescribe(
      describeMessage('an object where each value is '),
      context.descendAndDescribe(
        matcher['_case:matcher:matcher'],
        addLocation(':eachValueLike', context),
      ),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    matchContext.descendAndValidate(
      matcher['_case:matcher:matcher'],
      addLocation(`:eachValueLike`, matchContext),
    ),
};
