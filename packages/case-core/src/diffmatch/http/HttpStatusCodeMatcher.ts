import {
  HTTP_STATUS_CODE_MATCHER_TYPE,
  CoreHttpStatusCodeMatcher,
} from '@contract-case/case-entities-internal';
import { CaseCoreError } from '../../entities';
import {
  makeResults,
  errorWhen,
  actualToString,
  matchingError,
  hasNoErrors,
} from '../../entities/results';
import type {
  CaseError,
  MatchResult,
  CheckMatchFn,
  MatchContext,
  MatcherExecutor,
} from '../../entities/types';

const checkExample = (
  rule: number | string,
  actual: unknown,
  makeError: (message: string) => CaseError
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
        makeError(
          `Status code ${actualToString(actual)} is not equal to '${rule}'`
        )
      );
    case 'string': {
      const actualAsString = `${actual}`;
      if (actualAsString.length !== 3) {
        return makeResults(
          makeError(
            `Status code ${actualToString(
              actual
            )} does not appear to be the right length`
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
            makeError(
              `Status code ${actualToString(actual)} does not match '${rule}'`
            )
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
  if (Array.isArray(matcher['_case:matcher:rule'])) {
    const result = matcher['_case:matcher:rule']
      .map((e) => checkExample(e, actual, makeError))
      .find(hasNoErrors);

    return result !== undefined
      ? result
      : makeResults(
          matchingError(
            matcher,
            `The returned http status code (${actualToString(
              actual
            )}) did not match any of the following status codes: ${matcher[
              '_case:matcher:rule'
            ].join(', ')}`,
            actual,
            matchContext
          )
        );
  }
  return checkExample(matcher['_case:matcher:rule'], actual, makeError);
};

export const HttpStatusCodeMatcher: MatcherExecutor<
  typeof HTTP_STATUS_CODE_MATCHER_TYPE
> = {
  describe: (matcher: CoreHttpStatusCodeMatcher) =>
    `httpStatus ${
      Array.isArray(matcher['_case:matcher:rule'])
        ? matcher['_case:matcher:rule'].map((r) => `${r}`).join(' | ')
        : matcher['_case:matcher:rule']
    }`,
  check,
  strip: (matcher: CoreHttpStatusCodeMatcher) =>
    matcher['_case:matcher:example'],
};
