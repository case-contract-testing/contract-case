import type { CheckMatchFn, MatcherExecutor } from 'diffmatch/types';
import { CaseCoreError } from 'entities/CaseCoreError';
import type { MatchContext } from 'entities/context/types';
import type {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from 'entities/nodes/matchers/http/types';
import { errorWhen, matchingError } from 'entities/results/MatchingError';
import { makeResults, noErrors } from 'entities/results/MatchResult';
import type { MatchingError, MatchResult } from 'entities/types';

const checkExample = (
  rule: number | string,
  actual: unknown,
  makeError: (message: string) => MatchingError
): MatchResult => {
  if (typeof actual !== 'number')
    return makeResults(
      makeError(
        `Inappropriate type '${typeof actual}' for HTTP status code - must be a number`
      )
    );
  switch (typeof rule) {
    case 'number':
      return errorWhen(
        actual !== rule,
        makeError(`Status code '${actual}' is not equal to '${rule}'`)
      );
    case 'string': {
      const actualAsString = `${actual}`;
      if (actualAsString.length !== 3) {
        return makeResults(
          makeError(
            `Status code '${actual}' does not appear to be the right length`
          )
        );
      }
      for (let i = 0; i < rule.length; i += 1) {
        if (
          rule.charAt(i) !== 'x' &&
          rule.charAt(i) !== 'X' &&
          actualAsString.charAt(i) !== rule.charAt(i)
        ) {
          return makeResults(
            makeError(`Status code '${actual}' does not match '${rule}'`)
          );
        }
      }
      return makeResults();
    }
    default:
      throw new CaseCoreError(
        `Inappropriate type '${typeof rule}' for HTTP status code matching rule.`
      );
  }
};

const check: CheckMatchFn<typeof HTTP_STATUS_CODE_MATCHER_TYPE> = (
  matcher: CoreHttpStatusCodeMatcher,
  matchContext: MatchContext,
  actual: unknown
): MatchResult => {
  const makeError = (message: string) =>
    matchingError(matcher, message, actual, matchContext);
  if (Array.isArray(matcher['case:matcher:rule'])) {
    const result = matcher['case:matcher:rule']
      .map((e) => checkExample(e, actual, makeError))
      .find(noErrors);

    return result !== undefined
      ? result
      : makeResults(
          matchingError(
            matcher,
            `The returned http status code '${actual}' did not match the following rule: ${JSON.stringify(
              matcher['case:matcher:rule']
            )}`,
            actual,
            matchContext
          )
        );
  }
  return checkExample(matcher['case:matcher:rule'], actual, makeError);
};

export const HttpStatusCodeMatcher: MatcherExecutor<
  typeof HTTP_STATUS_CODE_MATCHER_TYPE
> = {
  check,
  strip: (matcher: CoreHttpStatusCodeMatcher) =>
    matcher['case:matcher:example'],
};
