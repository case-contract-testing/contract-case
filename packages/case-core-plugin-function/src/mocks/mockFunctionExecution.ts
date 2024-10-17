import {
  MockFunctionDescriptor,
  MOCK_FUNCTION_EXECUTION,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import { AllSetup } from './types';

export const setupMockFunctionExecution = (
  {
    request: expectedArguments,
    response: returnValue,
    functionName,
  }: MockFunctionDescriptor,
  parentContext: MatchContext,
): Promise<MockData<AllSetup, typeof MOCK_FUNCTION_EXECUTION>> =>
  Promise.resolve(
    addLocation(`mockFunction[${functionName}]`, parentContext),
  ).then((context) => {
    // create mock function
    let data: { actualArguments: unknown[] } | null = null;

    const f = (...stringArgs: string[]): string => {
      data = {
        actualArguments: stringArgs.map((s, index) => {
          try {
            return JSON.parse(s);
          } catch (e) {
            throw new CaseConfigurationError(
              `Parsing error in argument number ${index} in function '${functionName}': ${(e as Error).message}\n   The argument was: ${s}`,
            );
          }
        }),
      };

      context.logger.debug(
        'Mock function was invoked with arguments:',
        data.actualArguments,
      );

      const strippedReturnValue = context.descendAndStrip(
        returnValue,
        addLocation('returnValue', context),
      );
      context.logger.debug('Returning', strippedReturnValue);
      return JSON.stringify(strippedReturnValue);
    };

    return {
      config: {
        '_case:mock:type': MOCK_FUNCTION_EXECUTION,
        stateVariables: context['_case:currentRun:context:variables'],
        functions: { [functionName]: f },
        mock: { functionHandle: functionName },
      },
      assertableData: () =>
        Promise.resolve(data).then((result) => {
          if (data == null) {
            context.logger.debug(
              'The mock function appears not to have been invoked',
            );
          }
          return {
            actual: result ? result.actualArguments : null,
            context: addLocation('arguments', context),
            expected: expectedArguments,
          };
        }),
    };
  });
