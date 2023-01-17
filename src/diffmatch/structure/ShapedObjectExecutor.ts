import { matchingError } from 'entities/results/MatchingError';

import { addLocation } from 'entities/context';
import { combineResults, makeResults } from 'entities/results/MatchResult';
import { actualToString } from 'entities/results/renderActual';
import type {
  AnyCaseNodeOrData,
  AnyData,
  CoreShapedObjectMatcher,
  SHAPED_OBJECT_MATCHER_TYPE,
  MatchContext,
  MatchResult,
  StripMatcherFn,
  CheckMatchFn,
  MatcherExecutor,
} from 'entities/types';

const strip: StripMatcherFn<typeof SHAPED_OBJECT_MATCHER_TYPE> = (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext
): AnyData =>
  Object.entries<AnyCaseNodeOrData>(matcher['case:matcher:children'])
    .map(
      ([expectedKey, expectedValueMatcher]: [
        string,
        AnyCaseNodeOrData
      ]): Record<string, AnyData> => ({
        [expectedKey]: matchContext.descendAndStrip(
          expectedValueMatcher,
          addLocation(expectedKey, matchContext)
        ),
      })
    )
    .reduce(
      (acc: Record<string, AnyData>, entry: Record<string, AnyData>) => ({
        ...acc,
        ...entry,
      }),
      {}
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
      actual
    )}' is not an object because the Object constructor doesn't return a reference to it`;
  }

  return `If you are seeing this message, there is a bug in whyNotAnObject, where it can't see a reason that '${actualToString(
    actual
  )} is not an Object.`;
};

const check: CheckMatchFn<typeof SHAPED_OBJECT_MATCHER_TYPE> = async (
  matcher: CoreShapedObjectMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => [
  ...(typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null
    ? combineResults(
        (
          await Promise.all(
            Object.entries<AnyCaseNodeOrData>(
              matcher['case:matcher:children']
            ).map(
              ([expectedKey, expectedValueMatcher]: [
                string,
                AnyCaseNodeOrData
              ]): Promise<MatchResult> =>
                expectedKey in actual
                  ? Promise.resolve(
                      matchContext.descendAndCheck(
                        expectedValueMatcher,
                        addLocation(expectedKey, matchContext),
                        (actual as { [k: string]: unknown })[expectedKey]
                      )
                    )
                  : Promise.resolve(
                      makeResults(
                        matchingError(
                          matcher,
                          `missing key '${expectedKey}' in object: ${actualToString(
                            actual
                          )}`,
                          actual,
                          matchContext
                        )
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

export const ShapedObjectExecutor: MatcherExecutor<
  typeof SHAPED_OBJECT_MATCHER_TYPE
> = {
  describe: (matcher, context) =>
    `an object shaped like {${Object.entries(matcher['case:matcher:children'])
      .map(
        ([key, child]) =>
          `${key}: ${context.descendAndDescribe(
            child,
            addLocation(key, context)
          )}`
      )
      .join(',')}}`,
  check,
  strip,
};
