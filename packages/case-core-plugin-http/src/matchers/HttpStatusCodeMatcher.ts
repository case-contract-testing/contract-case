import {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-http-dsl';
import {
  CaseError,
  MatchResult,
  makeResults,
  errorWhen,
  actualToString,
  CaseCoreError,
  CheckMatchFn,
  MatchContext,
  matchingError,
  hasNoErrors,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import { validateCodes } from './codeValidator';

const statusCodeExample = (
  matcher: CoreHttpStatusCodeMatcher,
  matchContext: MatchContext,
) =>
  '_case:matcher:example' in matcher && matcher['_case:matcher:example'] != null
    ? matcher['_case:matcher:example']
    : validateCodes(matcher['_case:matcher:rule'], matchContext);

const checkExample = (
  rule: number | string,
  actual: unknown,
  makeError: (message: string) => CaseError,
): MatchResult => {
  if (typeof actual !== 'number')
    return makeResults(
      makeError(
        `Inappropriate type '${typeof actual}' for HTTP status code - must be a number`,
      ),
    );
  switch (typeof rule) {
    case 'number':
      return errorWhen(
        actual !== rule,
        makeError(
          `Status code ${actualToString(actual)} is not equal to '${rule}'`,
        ),
      );
    case 'string': {
      const actualAsString = `${actual}`;
      if (actualAsString.length !== 3) {
        return makeResults(
          makeError(
            `Status code ${actualToString(
              actual,
            )} does not appear to be the right length`,
          ),
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
              `Status code ${actualToString(actual)} does not match '${rule}'`,
            ),
          );
        }
      }
      return makeResults();
    }
    default:
      throw new CaseCoreError(
        `Inappropriate type '${typeof rule}' for HTTP status code matching rule.`,
      );
  }
};

const check: CheckMatchFn<CoreHttpStatusCodeMatcher> = (
  matcher: CoreHttpStatusCodeMatcher,
  matchContext: MatchContext,
  actual: unknown,
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
              actual,
            )}) did not match any of the following status codes: ${matcher[
              '_case:matcher:rule'
            ].join(', ')}`,
            actual,
            matchContext,
          ),
        );
  }
  return checkExample(matcher['_case:matcher:rule'], actual, makeError);
};

const validate = (
  matcher: CoreHttpStatusCodeMatcher,
  matchContext: MatchContext,
): Promise<void> =>
  Promise.resolve().then(() => {
    statusCodeExample(matcher, matchContext);
  });

export const HttpStatusCodeMatcher: MatcherExecutor<
  typeof HTTP_STATUS_CODE_MATCHER_TYPE,
  CoreHttpStatusCodeMatcher
> = {
  describe: (matcher: CoreHttpStatusCodeMatcher) =>
    `httpStatus ${
      Array.isArray(matcher['_case:matcher:rule'])
        ? matcher['_case:matcher:rule'].map((r) => `${r}`).join(' | ')
        : matcher['_case:matcher:rule']
    }`,
  check,
  strip: (matcher, matchContext) => statusCodeExample(matcher, matchContext),
  validate,
};
