import { addLocation } from '../../entities/context';
import {
  matcherToString,
  matchingError,
  combineResults,
  hasErrors,
  makeResults,
} from '../../entities/results';
import {
  AnyData,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
  ARRAY_CONTAINS_TYPE,
  CoreArrayContainsMatch,
  isCaseNode,
  AnyCaseNodeOrData,
} from '../../entities/types';

const strip: StripMatcherFn<typeof ARRAY_CONTAINS_TYPE> = (
  matcher: CoreArrayContainsMatch,
  matchContext: MatchContext
): AnyData =>
  matcher['case:matcher:matchers'].map((childMatcher, index) =>
    matchContext.descendAndStrip(
      childMatcher,
      addLocation(`:arrayContainsExample[${index}]`, matchContext)
    )
  );

const checkMatch = async (
  parentMatcher: CoreArrayContainsMatch,
  matcher: AnyCaseNodeOrData,
  matchContext: MatchContext,
  actual: unknown[]
) =>
  actual.length !== 0
    ? Promise.all(
        actual.map((actualEntry, index) =>
          matchContext.descendAndCheck(
            matcher,
            addLocation(`:actual[${index}]`, matchContext),
            actualEntry
          )
        )
      ).then((matchResult) => {
        const matched = matchResult.find((result) => !hasErrors(result));
        if (matched === undefined) {
          return combineResults(
            makeResults(
              matchingError(
                parentMatcher,
                `Expected an array that contained an element that matched '${
                  isCaseNode(matcher)
                    ? matcher['case:matcher:type']
                    : matcherToString(matcher)
                }', but no elements matched. All matching errors follow; this list may be long if there are many elements in the array`,
                actual,
                matchContext
              )
            ),
            ...matchResult
          );
        }
        return matched;
      })
    : makeResults(
        matchingError(
          parentMatcher,
          `Expected an array that contained an element that matched '${
            isCaseNode(matcher)
              ? matcher['case:matcher:type']
              : matcherToString(matcher)
          }', but the array was empty`,
          actual,
          matchContext
        )
      );

const check: CheckMatchFn<typeof ARRAY_CONTAINS_TYPE> = async (
  matcher: CoreArrayContainsMatch,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          ...(await Promise.all(
            matcher['case:matcher:matchers'].map((childMatcher, index) =>
              checkMatch(
                matcher,
                childMatcher,
                addLocation(`:arrayContainsExample[${index}]`, matchContext),
                actual
              )
            )
          ))
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

export const ArrayContains: MatcherExecutor<typeof ARRAY_CONTAINS_TYPE> = {
  describe: (matcher, matchContext) =>
    `an array containing ${matcher['case:matcher:matchers']
      .map((childMatcher, index) =>
        matchContext.descendAndDescribe(
          childMatcher,
          addLocation(`:arrayContains[${index}]`, matchContext)
        )
      )
      .join(' and ')},`,
  check,
  strip,
};
