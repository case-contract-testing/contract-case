import {
  MOCK_FUNCTION_CALLER,
  MockFunctionCallerDescriptor,
  MockFunctionDescriptor,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  MatchContext,
  MockData,
  MockExecutor,
  addLocation,
  defaultNameMock,
  providePluginContext,
} from '@contract-case/case-plugin-base';
import { AllSetup } from './types';
import { isObject } from '../entities';

const validateArray = (maybeArray: unknown, context: MatchContext) => {
  if (!Array.isArray(maybeArray)) {
    throw new CaseConfigurationError(
      'Arguments did not resolve to an array',
      context,
    );
  }
  return maybeArray;
};

export const setupMockFunctionCaller = (
  {
    request: expectedArguments,
    response: returnValue,
    functionName: functionHandle,
  }: MockFunctionDescriptor,
  outerContext: MatchContext,
): Promise<MockData<AllSetup, typeof MOCK_FUNCTION_CALLER>> =>
  Promise.resolve(
    providePluginContext(outerContext, {
      functionName: functionHandle,
    }),
  ).then((context) => {
    if (!functionHandle) {
      throw new CaseConfigurationError(
        'There was no functionName set to use as a handle to call this function. Please check the contract definition for this test.',
        context,
        'BAD_INTERACTION_DEFINITION',
      );
    }
    const callerArguments = validateArray(
      context.descendAndStrip(
        expectedArguments,
        addLocation('callerArguments', context),
      ),
      context,
    );

    return {
      config: {
        '_case:mock:type': MOCK_FUNCTION_CALLER,
        stateVariables: context['_case:currentRun:context:variables'],
        functions: {},
        mock: { functionHandle },
      },
      assertableData: () =>
        Promise.resolve().then(async () => {
          try {
            context.logger.debug(
              `Invoking function by handle '${functionHandle}', with arguments`,
              callerArguments,
            );
            const result = await context.invokeFunctionByHandle(
              functionHandle,
              callerArguments,
            );
            context.logger.maintainerDebug(
              `Function '${functionHandle}' returned`,
              result,
            );

            if (isObject(result)) {
              if ('success' in result) {
                context.logger.debug(
                  `Function '${functionHandle}' returned`,
                  result['success'],
                );
              }

              if ('errorClassName' in result) {
                context.logger.debug(
                  `Function '${functionHandle}' threw error of kind '${result['errorClassName']}'${'message' in result ? ` with message: ${result['message']}` : ''}`,
                );
              }
            }

            return {
              actual: result,
              context,
              expected: returnValue,
            };
          } catch (e) {
            if (e instanceof CaseConfigurationError) {
              throw e;
            }
            context.logger.error(
              `Function '${functionHandle}' threw an error`,
              (e as Error).message,
            );
            throw new CaseConfigurationError(
              `The provided function threw an error during execution:\n ${(e as Error).message}`,
              context,
            );
          }
        }),
    };
  });

export const mockFunctionCallerExecutor: MockExecutor<
  typeof MOCK_FUNCTION_CALLER,
  MockFunctionCallerDescriptor,
  AllSetup
> = {
  executor: setupMockFunctionCaller,
  ensureMatchersAreNamed: (
    descriptor: MockFunctionCallerDescriptor,
    parentContext: MatchContext,
  ) =>
    defaultNameMock(
      descriptor,
      providePluginContext(parentContext, {
        functionName: descriptor.functionName,
      }),
    ),
};
