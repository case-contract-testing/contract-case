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
} from '@contract-case/case-plugin-base';
import {
  AnyCaseMatcherOrData,
  AnyData,
} from '@contract-case/case-plugin-dsl-types';

const isSuccessResult = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
): matcher is CoreFunctionSuccessResultMatcher =>
  // this has to be !== undefined, since it could legitimately be 'null', indicating a void return
  'success' in matcher && matcher.success !== undefined;

const isObject = (
  actual: unknown,
): actual is Record<string, AnyCaseMatcherOrData> => // the return type here is technically not correct
  typeof actual === 'object' &&
  actual === Object(actual) &&
  !Array.isArray(actual) &&
  actual != null;

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
        errorKind: matchContext.descendAndStrip(
          matcher.errorKind,
          addLocation(`errorKind`, matchContext),
        ),
        ...('message' in matcher
          ? {
              message: matchContext.descendAndStrip(
                matcher.message,
                addLocation(`message`, matchContext),
              ),
            }
          : {}),
      };

const describe = (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  context: MatchContext,
): string =>
  isSuccessResult(matcher)
    ? `returning ${context.descendAndDescribe(
        matcher.success,
        addLocation(`returnValue`, context),
      )}`
    : `throwing a ${context.descendAndDescribe(
        matcher.errorKind,
        addLocation(`errorKind`, context),
      )}${
        'message' in matcher
          ? ` with message ${context.descendAndDescribe(
              matcher.message,
              addLocation(`message`, context),
            )}`
          : ''
      }`;

const check = async (
  matcher: CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> =>
  Promise.resolve(() => {}).then(() => {
    if (!isObject(actual)) {
      throw new CaseCoreError(
        `FunctionResultMatcher check() received a non-object response from a function. This indicates a bug in the function wrapper lib. What was returned was: ${actual}`,
      );
    }

    if (isSuccessResult(matcher)) {
      // We're expecting success
      if ('success' in actual) {
        if (typeof actual['success'] !== 'string') {
          const message =
            "The function return value (success) wasn't a string. This is a bug in the language specific wrapper.";
          matchContext.logger.error(`${message} The actual value was:`, actual);
          throw new CaseCoreError(message, matchContext);
        }
        let parsedActual;
        try {
          parsedActual = JSON.parse(actual['success']);
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

        return matchContext.descendAndCheck(
          matcher.success,
          addLocation(`returnValue`, matchContext),
          parsedActual,
        );
      }
      // and it wasn't a success
      if ('errorKind' in actual) {
        return [
          matchingError(
            matcher,
            `Expected the function to return success, but it failed with an error`,
            describe(
              {
                ...matcher,
                ...actual,
                '_case:matcher:type': matcher['_case:matcher:type'],
              },
              addLocation(':describingActual', matchContext),
            ),
            matchContext,
            describe(matcher, addLocation('describingExpected', matchContext)),
          ),
        ];
      }
      throw new CaseCoreError(
        `FunctionResultMatcher check() received an invalid response from a function. This indicates a bug in the function wrapper lib. What was returned was: ${actual}`,
      );
    } else {
      // We're expecting failure
      if ('errorKind' in actual) {
        return matchContext.descendAndCheck(
          matcher.errorKind,
          addLocation(`thrownErrorKind`, matchContext),
          actual['errorKind'],
        );
      }
      // But it was a success
      return [
        matchingError(
          matcher,
          `Expected the function to throw an error, but it returned successfully`,
          describe(
            {
              ...matcher,
              ...actual,
              '_case:matcher:type': matcher['_case:matcher:type'],
            },
            addLocation(':describingActual', matchContext),
          ),
          matchContext,
          describe(matcher, addLocation('describingExpected', matchContext)),
        ),
      ];
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
    if (!('errorKind' in matcher)) {
      matchContext.logger.error(
        `FunctionSuccess or FunctionResult matcher must have a 'success' or an 'errorKind' field. Matcher was:`,
        matcher,
      );
      throw new CaseConfigurationError(
        `FunctionSuccess or FunctionResult matcher must have a 'success' or an 'errorKind' field`,
        matchContext,
        'BAD_INTERACTION_DEFINITION',
      );
    }
    throw new CaseCoreError('Not implemented', matchContext);
  });

export const FunctionResultMatcherExecutor: MatcherExecutor<
  typeof FUNCTION_RESULT_MATCHER_TYPE,
  CoreFunctionSuccessResultMatcher | CoreFunctionErrorResultMatcher
> = { describe, check, strip, validate };
