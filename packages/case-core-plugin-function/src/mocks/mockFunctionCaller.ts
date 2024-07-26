import {
  MOCK_FUNCTION_CALLER,
  MockFunctionDescriptor,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import { AllSetup } from './types';

const validateArray = (maybeArray: unknown, context: MatchContext) => {
  if (!Array.isArray(maybeArray)) {
    throw new CaseConfigurationError(
      'Arguments did not resolve to an array',
      context,
    );
  }
  return maybeArray;
};

const extractHandle = (context: MatchContext): string => {
  if (!context['_case:currentRun:context:mockConfig']) {
    throw new CaseConfigurationError(
      "Must specify mockConfig for the 'function' plugin",
      context,
    );
  }
  if (!('function' in context['_case:currentRun:context:mockConfig'])) {
    throw new CaseConfigurationError(
      "Must specify mockConfig for the 'function' plugin",
      context,
    );
  }
  if (
    !('handle' in context['_case:currentRun:context:mockConfig']['function'])
  ) {
    throw new CaseConfigurationError(
      "Must specify a value for 'handle' in mockConfig['function']",
      context,
    );
  }

  if (
    !(
      typeof context['_case:currentRun:context:mockConfig']['function'][
        'handle'
      ] === 'string'
    )
  ) {
    throw new CaseConfigurationError(
      "'handle' was specified in mockConfig['function'], but it wasn't a string",
      context,
    );
  }
  return context['_case:currentRun:context:mockConfig']['function']['handle'];
};

export const setupMockFunctionCaller = (
  { arguments: expectedArguments, returnValue }: MockFunctionDescriptor,
  context: MatchContext,
): Promise<MockData<AllSetup, typeof MOCK_FUNCTION_CALLER>> =>
  Promise.resolve().then(() => {
    const callerArguments = validateArray(
      context.descendAndStrip(
        expectedArguments,
        addLocation('callerArguments', context),
      ),
      context,
    );

    const handle = extractHandle(context);

    return {
      config: {
        '_case:mock:type': MOCK_FUNCTION_CALLER,
        variables: context['_case:currentRun:context:variables'],
        functionHandle: '',
      },
      assertableData: () =>
        Promise.resolve().then(async () => {
          try {
            context.logger.debug(
              `Invoking function by handle '${handle}', with arguments`,
              callerArguments,
            );
            const result = await context.invokeFunctionByHandle(
              handle,
              callerArguments,
            );
            context.logger.debug(`Function '${handle}' returned`, result);
            return {
              actual: result,
              context: addLocation('calledFunction', context),
              expected: returnValue,
            };
          } catch (e) {
            if (e instanceof CaseConfigurationError) {
              throw e;
            }
            context.logger.error(`Function '${handle}' threw an error`, e);
            throw new CaseConfigurationError(
              `The provided function threw an error during execution: ${(e as Error).message}`,
              context,
            );
          }
        }),
    };
  });
