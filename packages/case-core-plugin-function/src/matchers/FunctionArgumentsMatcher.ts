import {
  CoreFunctionArgumentsMatcher,
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  MatchContext,
  AnyData,
  addLocation,
  MatchResult,
  CaseConfigurationError,
  MatcherExecutor,
  errorWhen,
  matchingError,
  combineResultPromises,
  CaseCoreError,
  hasErrors,
} from '@contract-case/case-plugin-base';

const strip = (
  matcher: CoreFunctionArgumentsMatcher,
  matchContext: MatchContext,
): AnyData =>
  matchContext.descendAndStrip(
    matcher.arguments,
    addLocation(`functionArguments`, matchContext),
  );

const describe = (
  { arguments: expectedArguments }: CoreFunctionArgumentsMatcher,
  context: MatchContext,
): string =>
  expectedArguments.length === 0
    ? 'a function invoked with no arguments'
    : `a function invoked with ${expectedArguments.length} argument${expectedArguments.length === 1 ? '' : 's'} ( ${expectedArguments
        .map((arg, index) =>
          context.descendAndDescribe(arg, addLocation(`[${index}]`, context)),
        )
        .join(', ')} )`;

const check = async (
  matcher: CoreFunctionArgumentsMatcher,
  matchContext: MatchContext,
  actual: unknown,
): Promise<MatchResult> => {
  if (!actual) {
    throw new CaseConfigurationError(
      'The expected function was never invoked. Please ensure you are calling the mock function',
      matchContext,
    );
  }
  if (!Array.isArray(actual)) {
    matchContext.logger.maintainerDebug(
      'Failing because actual appears not to be an array of function arguments. Actual is:',
      actual,
    );
    throw new CaseCoreError(
      'Expected a function call to receive a number of arguments, please ensure your example is correctly defined.',
      matchContext,
    );
  }

  const argResults =
    matcher.arguments.length === actual.length
      ? await combineResultPromises(
          ...matcher.arguments.map((expectedArg, index) =>
            matchContext.descendAndCheck(
              expectedArg,
              addLocation(`[${index}]`, matchContext),
              actual[index],
            ),
          ),
        )
      : [];

  return combineResultPromises(
    errorWhen(
      matcher.arguments.length !== actual.length,
      matchingError(
        matcher,
        `The function expected ${matcher.arguments.length} argument${matcher.arguments.length === 1 ? '' : 's'}, but received ${actual.length} argument${actual.length === 1 ? '' : 's'}`,
        describe(
          { ...matcher, arguments: actual },
          addLocation(':describingActual', matchContext),
        ),
        matchContext,
        describe(matcher, addLocation(':describingExpected', matchContext)),
      ),
    ),
    errorWhen(
      hasErrors(argResults),
      matchingError(
        matcher,
        `The function arguments didn't match`,
        describe(
          { ...matcher, arguments: actual },
          addLocation(':describingActual', matchContext),
        ),
        matchContext,
        describe(matcher, addLocation(':describingExpected', matchContext)),
      ),
    ),
    argResults,
  );
};

export const FunctionArgumentMatcherExecutor: MatcherExecutor<
  typeof FUNCTION_ARGUMENTS_MATCHER_TYPE,
  CoreFunctionArgumentsMatcher
> = { describe, check, strip };
