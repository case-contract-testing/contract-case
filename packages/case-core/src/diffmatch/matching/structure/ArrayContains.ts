import {
  ARRAY_CONTAINS_TYPE,
  CoreArrayContainsMatcher,
} from '@contract-case/case-entities-internal';
import {
  StripMatcherFn,
  MatchContext,
  addLocation,
  hasErrors,
  combineResults,
  makeResults,
  matchingError,
  isCaseNode,
  matcherToString,
  CheckMatchFn,
  MatchResult,
  MatcherExecutor,
  CaseConfigurationError,
  describeConcat,
  describeJoin,
  describeMessage,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';

const strip: StripMatcherFn<CoreArrayContainsMatcher> = (
  matcher: CoreArrayContainsMatcher,
  matchContext: MatchContext,
): AnyData =>
  matcher['_case:matcher:matchers'].map((childMatcher, index) =>
    matchContext.descendAndStrip(
      childMatcher,
      addLocation(`:arrayContainsExample[${index}]`, matchContext),
    ),
  );

const checkMatch = async (
  parentMatcher: CoreArrayContainsMatcher,
  matcher: AnyCaseMatcherOrData,
  matchContext: MatchContext,
  actual: unknown[],
) =>
  actual.length !== 0
    ? Promise.all(
        actual.map((actualEntry, index) =>
          matchContext.descendAndCheck(
            matcher,
            addLocation(`:actual[${index}]`, matchContext),
            actualEntry,
          ),
        ),
      ).then((matchResult) => {
        const matched = matchResult.find((result) => !hasErrors(result));
        if (matched === undefined) {
          return combineResults(
            makeResults(
              matchingError(
                parentMatcher,
                `Expected an array that contained an element that matched '${
                  isCaseNode(matcher)
                    ? matcher['_case:matcher:type']
                    : matcherToString(matcher)
                }', but no elements matched. All matching errors follow; this list may be long if there are many elements in the array`,
                actual,
                matchContext,
              ),
            ),
            ...matchResult,
          );
        }
        return matched;
      })
    : makeResults(
        matchingError(
          parentMatcher,
          `Expected an array that contained an element that matched '${
            isCaseNode(matcher)
              ? matcher['_case:matcher:type']
              : matcherToString(matcher)
          }', but the array was empty`,
          actual,
          matchContext,
        ),
      );

const check: CheckMatchFn<CoreArrayContainsMatcher> = async (
  matcher: CoreArrayContainsMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          ...(await Promise.all(
            matcher['_case:matcher:matchers'].map((childMatcher, index) =>
              checkMatch(
                matcher,
                childMatcher,
                addLocation(`:arrayContainsExample[${index}]`, matchContext),
                actual,
              ),
            ),
          )),
        )
      : makeResults(
          matchingError(
            matcher,
            `'${typeof actual}' is not an array`,
            actual,
            matchContext,
          ),
        ),
  );

export const ArrayContains: MatcherExecutor<
  typeof ARRAY_CONTAINS_TYPE,
  CoreArrayContainsMatcher
> = {
  describe: (matcher, matchContext) =>
    describeConcat(
      describeMessage('an array containing '),
      describeJoin(
        ' and ',
        matcher['_case:matcher:matchers'].map((childMatcher, index) =>
          matchContext.descendAndDescribe(
            childMatcher,
            addLocation(`:arrayContains[${index}]`, matchContext),
          ),
        ),
      ),
      describeMessage(','),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.resolve()
      .then(() => {
        if (!Array.isArray(matcher['_case:matcher:matchers'])) {
          throw new CaseConfigurationError(
            "The ArrayContains matchers was given something that wasn't an array",
            matchContext,
            'BAD_INTERACTION_DEFINITION',
          );
        }
      })
      .then(() =>
        Promise.all(
          matcher['_case:matcher:matchers'].map((childMatcher, index) =>
            matchContext.descendAndValidate(
              childMatcher,
              addLocation(`:arrayContains[${index}]`, matchContext),
            ),
          ),
        ),
      )
      .then(() => {}),
};
