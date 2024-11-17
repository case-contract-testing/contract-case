import {
  SHAPED_OBJECT_MATCHER_TYPE,
  CoreShapedObjectMatcher,
  CaseNodeFor,
} from '@contract-case/case-entities-internal';
import {
  StripMatcherFn,
  MatchContext,
  addLocation,
  actualToString,
  CheckMatchFn,
  MatchResult,
  combineResults,
  makeResults,
  matchingError,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';

const strip: StripMatcherFn<CaseNodeFor<typeof SHAPED_OBJECT_MATCHER_TYPE>> = (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext,
): AnyData =>
  Object.entries<AnyCaseMatcherOrData>(matcher['_case:matcher:children'])
    .map(
      ([expectedKey, expectedValueMatcher]: [
        string,
        AnyCaseMatcherOrData,
      ]): Record<string, AnyData> => ({
        [expectedKey]: matchContext.descendAndStrip(
          expectedValueMatcher,
          addLocation(expectedKey, matchContext),
        ),
      }),
    )
    .reduce(
      (acc: Record<string, AnyData>, entry: Record<string, AnyData>) => ({
        ...acc,
        ...entry,
      }),
      {},
    );

const whyNotAnObject = (actual: unknown) => {
  if (typeof actual !== 'object') {
    return `Expected an object, but the type was '${typeof actual}' instead`;
  }
  if (Array.isArray(actual)) {
    return 'Expected an object, but it was an array';
  }
  if (actual != null) {
    return 'Expected an object, but it was null or undefined';
  }
  if (actual !== Object(actual)) {
    return `Expected an object, but '${actualToString(
      actual,
    )}' is not an object because the Object constructor doesn't return a reference to it`;
  }

  return `If you are seeing this message, there is a bug in whyNotAnObject, where it can't see a reason that '${actualToString(
    actual,
  )} is not an Object.`;
};

const check: CheckMatchFn<
  CaseNodeFor<typeof SHAPED_OBJECT_MATCHER_TYPE>
> = async (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => [
  ...(typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null
    ? combineResults(
        (
          await Promise.all(
            Object.entries<AnyCaseMatcherOrData>(
              matcher['_case:matcher:children'],
            ).map(
              ([expectedKey, expectedValueMatcher]: [
                string,
                AnyCaseMatcherOrData,
              ]): Promise<MatchResult> =>
                expectedKey in actual
                  ? Promise.resolve(
                      matchContext.descendAndCheck(
                        expectedValueMatcher,
                        addLocation(expectedKey, matchContext),
                        (actual as { [k: string]: unknown })[expectedKey],
                      ),
                    )
                  : Promise.resolve(
                      makeResults(
                        matchingError(
                          matcher,
                          `missing key '${expectedKey}' in object: ${actualToString(
                            actual,
                          )}`,
                          actual,
                          matchContext,
                        ),
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

export const ShapedObjectExecutor: MatcherExecutor<
  typeof SHAPED_OBJECT_MATCHER_TYPE,
  CaseNodeFor<typeof SHAPED_OBJECT_MATCHER_TYPE>
> = {
  describe: (matcher, context) =>
    `an object shaped like {${Object.entries(matcher['_case:matcher:children'])
      .map(
        ([key, child]) =>
          `${key}: ${context.descendAndDescribe(
            child,
            addLocation(key, context),
          )}`,
      )
      .join(',')}}`,
  check,
  strip,
  validate: (matcher, matchContext) =>
    Promise.all(
      Object.entries(matcher['_case:matcher:children']).map(([key, child]) =>
        matchContext.descendAndValidate(
          child,
          addLocation(`${key}`, matchContext),
        ),
      ),
    ).then(() => {}),
};
