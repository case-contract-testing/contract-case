import {
  COMBINE_MATCHERS_TYPE,
  CoreAndCombinationMatcher,
  AnyData,
  isCaseNode,
} from '@contract-case/case-entities-internal';
import { StripUnsupportedError } from '../../entities';
import { addLocation } from '../../entities/context';
import {
  type StripMatcherFn,
  type MatchContext,
  type CheckMatchFn,
  type MatchResult,
  type MatcherExecutor,
} from '../../entities/types';

const strip: StripMatcherFn<typeof COMBINE_MATCHERS_TYPE> = (
  matcher: CoreAndCombinationMatcher,
  matchContext: MatchContext,
): AnyData => {
  const firstStrippedResult = matcher['_case:matcher:children']
    .map((additionalMatcher, index) => {
      try {
        return matchContext.descendAndStrip(
          additionalMatcher,
          addLocation(`:and[${index}]`, matchContext),
        );
      } catch (e) {
        if (e instanceof StripUnsupportedError) {
          matchContext.logger.maintainerDebug(
            `AndCombinationMatcher is ignoring StripUnsupportedError from ${
              isCaseNode(additionalMatcher)
                ? additionalMatcher['_case:matcher:type']
                : additionalMatcher
            }`,
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
      `AndCombinationMatcher had no matchers that supported strip`,
    );
    throw new StripUnsupportedError(matcher, matchContext);
  }
  return firstStrippedResult;
};

const check: CheckMatchFn<typeof COMBINE_MATCHERS_TYPE> = async (
  matcher: CoreAndCombinationMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  (
    await Promise.all(
      matcher['_case:matcher:children']
        .map((expectedChild, index) =>
          matchContext.descendAndCheck(
            expectedChild,
            addLocation(`:and[${index}]`, matchContext),
            actual,
          ),
        )
        .flat(),
    )
  ).flat();

export const AndCombinationMatcher: MatcherExecutor<
  typeof COMBINE_MATCHERS_TYPE
> = {
  describe: (matcher, matchContext) =>
    matcher['_case:matcher:children']
      .map((child, index) =>
        matchContext.descendAndDescribe(
          child,
          addLocation(`:and[${index}]`, matchContext),
        ),
      )
      .join(' and '),
  check,
  strip,
};
