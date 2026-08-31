import {
  CoreFunctionErrorResultMatcher,
  CoreFunctionSuccessResultMatcher,
  FUNCTION_RESULT_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  MatchContext,
  MatchResult,
  MatcherExecutor,
  CaseCoreError,
  addLocation,
  matchingError,
  CaseConfigurationError,
  DescribeSegment,
  concatenateDescribe,
  describeMessage,
  renderToString,
  makeNoErrorResult,
  combineResultPromises,
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';
import { isObject } from '../entities';

export const isSuccessResult = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
): matcher is CoreFunctionSuccessResultMatcher =>
  // this has to be !== undefined, since it could legitimately be 'null', indicating a void return
  'success' in matcher && matcher.success !== undefined;

type FunctionFailure = {
  errorClassName: string;
  message?: string | undefined;
  stack?: string | undefined;
  errorInternals?: unknown;
};

const isFunctionFailure = (
  maybeFailure: unknown,
): maybeFailure is FunctionFailure =>
  isObject(maybeFailure) &&
  'errorClassName' in maybeFailure &&
  typeof maybeFailure['errorClassName'] === 'string';

/**
 * Checks that the `actual` is a function failure, and if it is, checks that it's the one we expect
 * @param matcher - a function error result matcher
 * @param matchContext - current match context
 * @param actual - actual data received here
 * @returns a Promise representing a MatchResult.
 */
const checkFunctionFailure = (
  matcher: CoreFunctionErrorResultMatcher,
  matchContext: MatchContext,
  actual: Record<string, AnyCaseMatcherOrData>,
): Promise<MatchResult> =>
  'errorClassName' in actual
    ? // This was a failure, check the fields
      combineResultPromises(
        matchContext.descendAndCheck(
          matcher.errorClassName,
          addLocation(`thrownErrorKind`, matchContext),
          actual['errorClassName'],
        ),
        'message' in matcher && matcher.message != null
          ? matchContext.descendAndCheck(
              matcher.message,
              addLocation(`message`, matchContext),
              actual['message'],
            )
          : makeNoErrorResult(),
        'errorInternals' in matcher && matcher.errorInternals != null
          ? matchContext.descendAndCheck(
              matcher.errorInternals,
              addLocation(`errorInternals`, matchContext),
              actual['errorInternals'],
            )
          : makeNoErrorResult(),
      )
    : Promise.resolve([
        matchingError(
          matcher,
          `Expected the function to throw an error, but it returned successfully`,
          actual['success'],
          matchContext,
          matchContext.descendAndStrip(
            matcher,
            addLocation(':strippingExpected', matchContext),
          ),
          {
            actual: 'Successfully returned',
            expected: 'Error thrown',
          },
        ),
      ]);

const strip = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  matchContext: MatchContext,
): AnyData =>
  isSuccessResult(matcher)
    ? {
        // We have to stringify this, as the contract of `strip()`
        // is to return an example that would pass the matcher if it were
        // passed in as an actual to check
        success: JSON.stringify(
          matchContext.descendAndStrip(
            matcher.success,
            addLocation(`returnValue`, matchContext),
          ),
        ),
      }
    : {
        errorClassName: matchContext.descendAndStrip(
          matcher.errorClassName,
          addLocation(`errorClassName`, matchContext),
        ),
        ...('message' in matcher
          ? {
              message: matchContext.descendAndStrip(
                matcher.message,
                addLocation(`message`, matchContext),
              ),
            }
          : {}),
        ...('errorInternals' in matcher
          ? {
              errorInternals: matchContext.descendAndStrip(
                matcher.errorInternals,
                addLocation(`errorInternals`, matchContext),
              ),
            }
          : {}),
      };

const describe = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  context: MatchContext,
): DescribeSegment => {
  if (isSuccessResult(matcher)) {
    return concatenateDescribe(
      describeMessage('returns '),
      context.descendAndDescribe(
        matcher.success,
        addLocation(`returnValue`, context),
      ),
    );
  }

  const segments: DescribeSegment[] = [
    describeMessage(
      `throwing a ${JSON.parse(
        renderToString(
          context.descendAndDescribe(
            matcher.errorClassName,
            addLocation(`errorClassName`, context),
          ),
        ),
      )}`,
    ),
  ];

  if ('message' in matcher) {
    segments.push(
      describeMessage(' with message: '),
      context.descendAndDescribe(
        matcher.message,
        addLocation(`message`, context),
      ),
    );
  }

  if ('errorInternals' in matcher) {
    segments.push(
      describeMessage(' with error internals: '),
      context.descendAndDescribe(
        matcher.errorInternals,
        addLocation(`errorInternals`, context),
      ),
    );
  }

  return concatenateDescribe(...segments);
};

const parseActualSuccess = (
  actual: unknown,
  matchContext: MatchContext,
): unknown => {
  if (!isObject(actual)) {
    throw new CaseCoreError(
      `FunctionResultMatcher check() received a non-object response from a function. This indicates a bug in the function wrapper lib. What was returned was: ${actual}`,
    );
  }
  if (typeof actual['success'] !== 'string') {
    const message =
      "The function return value (success) wasn't a string. This is a bug in the language specific wrapper.";
    matchContext.logger.error(`${message} The actual value was:`, actual);
    throw new CaseCoreError(message, matchContext);
  }
  try {
    return JSON.parse(actual['success']);
  } catch (e) {
    const message =
      "The function return value didn't parse as JSON. This is a bug in the language specific wrapper.";
    matchContext.logger.error(
      `${message} The error was:`,
      e,
      'The actual was:',
      actual['success'],
    );
    throw new CaseCoreError(message, matchContext, (e as Error).stack);
  }
};

const check = async (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  Promise.resolve().then(() => {
    if (!isObject(actual)) {
      throw new CaseCoreError(
        `FunctionResultMatcher check() received a non-object response from a function. This indicates a bug in the function wrapper lib. What was returned was: ${actual}`,
      );
    }

    if (isSuccessResult(matcher)) {
      // We're expecting success
      if ('success' in actual) {
        const parsedActual = parseActualSuccess(actual, matchContext);
        return matchContext.descendAndCheck(
          matcher.success,
          addLocation(`returnValue`, matchContext),
          parsedActual,
        );
      }
      // and it wasn't a success
      if (isFunctionFailure(actual)) {
        matchContext.logger.error(
          `Expected the function to return success, but it failed with an error (${actual.errorClassName})`,
        );
        if (actual.stack) {
          matchContext.logger.error('Stack trace was:', actual.stack);
        }
        return [
          matchingError(
            matcher,
            `Expected the function to return success, but it failed with an error`,
            actual,
            matchContext,
            matchContext.descendAndStrip(
              matcher,
              addLocation(':strippingExpected', matchContext),
            ),
            {
              actual: 'Function threw an error',
              expected: 'Successfully returned',
            },
          ),
        ];
      }
      throw new CaseCoreError(
        `FunctionResultMatcher check() received an invalid response from a function. This indicates a bug in the function wrapper lib. What was returned was: ${actual}`,
      );
    } else {
      return checkFunctionFailure(matcher, matchContext, actual);
    }
  });

const validate = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  matchContext: MatchContext,
): Promise<void> =>
  Promise.resolve().then(() => {
    if (isSuccessResult(matcher)) {
      return matchContext.descendAndValidate(
        matcher.success,
        addLocation(`returnValue`, matchContext),
      );
    }
    if (!('errorClassName' in matcher)) {
      matchContext.logger.error(
        `FunctionSuccess or FunctionResult matcher must have a 'success' or an 'errorClassName' field. Matcher was:`,
        matcher,
      );
      throw new CaseConfigurationError(
        `FunctionSuccess or FunctionResult matcher must have a 'success' or an 'errorClassName' field`,
        matchContext,
        'BAD_INTERACTION_DEFINITION',
      );
    }
    return Promise.resolve()
      .then(() =>
        matchContext.descendAndValidate(
          matcher.errorClassName,
          addLocation('errorClassName', matchContext),
        ),
      )
      .then(async () => {
        if ('message' in matcher && matcher.message != null) {
          await matchContext.descendAndValidate(
            matcher.message,
            addLocation('message', matchContext),
          );
        }
      })
      .then(async () => {
        if ('errorInternals' in matcher && matcher.errorInternals != null) {
          await matchContext.descendAndValidate(
            matcher.errorInternals,
            addLocation('errorInternals', matchContext),
          );
        }
      });
  });

export const FunctionResultMatcherExecutor: MatcherExecutor<
  typeof FUNCTION_RESULT_MATCHER_TYPE,
  CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher
> = { describe, check, strip, validate };
