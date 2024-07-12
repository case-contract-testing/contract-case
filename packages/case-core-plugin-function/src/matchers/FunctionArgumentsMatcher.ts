import {
  MatchContext,
  AnyData,
  addLocation,
  MatchResult,
  CaseConfigurationError,
  MatcherExecutor,
} from '@contract-case/case-plugin-base';
import {
  CoreFunctionArgumentsMatcher,
  FUNCTION_ARGUMENTS_MATCHER_TYPE,
} from '../dsl/matchers';

const strip = (
  matcher: CoreFunctionArgumentsMatcher,
  matchContext: MatchContext,
): AnyData =>
  matchContext.descendAndStrip(
    matcher.arguments,
    addLocation(`functionArguments`, matchContext),
  );

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

  return matchContext.descendAndCheck(
    matcher.arguments,
    addLocation(`functionArguments`, matchContext),
    actual,
  );
};

const describe = (
  { arguments: expectedArguments }: CoreFunctionArgumentsMatcher,
  context: MatchContext,
): string =>
  expectedArguments.length === 0
    ? 'a function invoked with no arguments'
    : `"a function invoked with arguments: ${expectedArguments
        .map((arg, index) =>
          context.descendAndDescribe(
            arg,
            addLocation(`arg[${index}]`, context),
          ),
        )
        .join(', ')}`;

export const FunctionArgumentMatcherExecutor: MatcherExecutor<
  typeof FUNCTION_ARGUMENTS_MATCHER_TYPE,
  CoreFunctionArgumentsMatcher
> = { describe, check, strip };
