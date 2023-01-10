import { addLocation } from 'entities/context';
import { StripUnsupportedError } from 'entities/StripUnsupportedError';
import {
  StripMatcherFn,
  COMBINE_MATCHERS_TYPE,
  CoreAndCombinationMatcher,
  MatchContext,
  AnyData,
  CheckMatchFn,
  MatchResult,
  MatcherExecutor,
  isCaseNode,
} from 'entities/types';

const strip: StripMatcherFn<typeof COMBINE_MATCHERS_TYPE> = (
  matcher: CoreAndCombinationMatcher,
  matchContext: MatchContext
): AnyData => {
  const firstStrippedResult = matcher['case:matcher:children']
    .map((additionalMatcher, index) => {
      try {
        return matchContext.descendAndStrip(
          additionalMatcher,
          addLocation(`:and[${index}]`, matchContext)
        );
      } catch (e) {
        if (e instanceof StripUnsupportedError) {
          matchContext.logger.maintainerDebug(
            `AndCombinationMatcher is ignoring StripUnsupportedError from ${
              isCaseNode(additionalMatcher)
                ? additionalMatcher['case:matcher:type']
                : additionalMatcher
            }`
          );
          return e;
        }
        throw e;
      }
    })
    .find((item) => !(item instanceof StripUnsupportedError));

  if (
    firstStrippedResult === undefined ||
    firstStrippedResult instanceof StripUnsupportedError // This check isn't necessary, but the compiler now knows that it's not returning an error
  ) {
    matchContext.logger.maintainerDebug(
      `AndCombinationMatcher had no matchers that supported strip`
    );
    throw new StripUnsupportedError(matcher, matchContext);
  }
  return firstStrippedResult;
};

const check: CheckMatchFn<typeof COMBINE_MATCHERS_TYPE> = async (
  matcher: CoreAndCombinationMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> =>
  (
    await Promise.all(
      matcher['case:matcher:children']
        .map((expectedChild, index) =>
          matchContext.descendAndCheck(
            expectedChild,
            addLocation(`:and[${index}]`, matchContext),
            actual
          )
        )
        .flat()
    )
  ).flat();

export const AndCombinationMatcher: MatcherExecutor<
  typeof COMBINE_MATCHERS_TYPE
> = { check, strip };
