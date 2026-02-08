import {
  SHAPED_ARRAY_MATCHER_TYPE,
  CoreShapedArrayMatcher,
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
  makeNoErrorResult,
  MatcherExecutor,
  describeConcat,
  describeNested,
  describeJoin,
  describeMessage,
} from '@contract-case/case-plugin-base';
import { AnyData } from '@contract-case/case-plugin-dsl-types';

const strip: StripMatcherFn<CaseNodeFor<typeof SHAPED_ARRAY_MATCHER_TYPE>> = (
  matcher: CoreShapedArrayMatcher,
  matchContext: MatchContext,
): AnyData =>
  matcher['_case:matcher:children'].map((expectedChild, index) =>
    matchContext.descendAndStrip(
      expectedChild,
      addLocation(`[${index}]`, matchContext),
    ),
  );

const check: CheckMatchFn<
  CaseNodeFor<typeof SHAPED_ARRAY_MATCHER_TYPE>
> = async (
  matcher: CoreShapedArrayMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  combineResults(
    Array.isArray(actual)
      ? combineResults(
          actual.length >= matcher['_case:matcher:children'].length
            ? (
                await Promise.all(
                  matcher['_case:matcher:children']
                    .map((expectedChild, index) =>
                      matchContext.descendAndCheck(
                        expectedChild,
                        addLocation(`[${index}]`, matchContext),
                        actual[index],
                      ),
                    )
                    .flat(),
                )
              ).flat()
            : makeResults(
                matchingError(
                  matcher,
                  `Array has different lengths - expected at least '${matcher['_case:matcher:children'].length}' elements, but found only '${actual.length} elements`,
                  actual,
                  matchContext,
                ),
              ),
          matcher['_case:matcher:children'].length === 0 && actual.length !== 0
            ? makeResults(
                matchingError(
                  matcher,
                  `Expected an empty array, but instead found ${actual.length} elements`,
                  actual,
                  matchContext,
                ),
              )
            : makeNoErrorResult(),
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

export const ShapedArrayExecutor: MatcherExecutor<
  typeof SHAPED_ARRAY_MATCHER_TYPE,
  CaseNodeFor<typeof SHAPED_ARRAY_MATCHER_TYPE>
> = {
  describe: (matcher, context) =>
    describeConcat(
      describeMessage('an array shaped like '),
      describeNested(
        '[]',
        describeJoin(
          ',',
          matcher['_case:matcher:children'].map((child, index) =>
            context.descendAndDescribe(
              child,
              addLocation(`[${index}]`, context),
            ),
          ),
        ),
      ),
    ),
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.all(
      matcher['_case:matcher:children'].map((childMatcher, index) =>
        matchContext.descendAndValidate(
          childMatcher,
          addLocation(`[${index}]`, matchContext),
        ),
      ),
    ).then(() => {}),
};
