import {
  MockFunctionDescriptor,
  MOCK_FUNCTION_EXECUTION,
  FunctionResponse,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  CaseConfigurationError,
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import { AllSetup } from './types';

const validateFunctionResponse = (
  maybeFunctionResponse: unknown,
  context: MatchContext,
): FunctionResponse => {
  if (
    maybeFunctionResponse === null ||
    typeof maybeFunctionResponse !== 'object'
  ) {
    const message = `Bad function return value in interaction. 
        This interaction had a function response that wasn't an object. 
        
        Please update the function definition to be a ReturnValue or a FunctionThrows matcher.
        `;

    context.logger.error(
      `${message}
        The defined return type was:`,
      maybeFunctionResponse,
    );

    throw new CaseConfigurationError(
      message,
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  const data = maybeFunctionResponse as FunctionResponse;

  if ('success' in data) {
    return data;
  }
  if ('errorClassName' in data) {
    return data;
  }
  const message = `Bad function return value in interaction. 
      This interaction had a function response that didn't contain a 'success' or 'errorClassName' key. 
           
        Please update the function definition to be a ReturnValue or a FunctionThrows matcher.`;

  context.logger.error(
    `${message}
        The defined return type was:`,
    maybeFunctionResponse,
  );
  throw new CaseConfigurationError(
    message,
    context,
    'BAD_INTERACTION_DEFINITION',
  );
};

export const setupMockFunctionExecution = (
  {
    request: expectedArguments,
    response: expectedResponse,
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
              `Parsing error in argument number ${index} in function '${functionName}': ${(e as Error).message}\n   \n   This happens if non-JSON arguments are passed to the mock function.\n\n   The argument was: ${s}\n    `,
              context,
            );
          }
        }),
      };

      context.logger.debug(
        'Mock function was invoked with arguments:',
        data.actualArguments,
      );

      const functionResponse = validateFunctionResponse(
        context.descendAndStrip(
          expectedResponse,
          addLocation('returnValue', context),
        ),
        context,
      );
      context.logger.maintainerDebug('functionResponse was', functionResponse);

      if ('success' in functionResponse) {
        context.logger.debug('Returning', functionResponse.success);
        return JSON.stringify({
          success: functionResponse.success,
        });
      }

      if ('errorClassName' in functionResponse) {
        context.logger.debug(
          `Returning error of kind '${functionResponse.errorClassName}'${'message' in functionResponse ? ` with message: ${functionResponse.message}` : ''}`,
        );
        return JSON.stringify({
          errorClassName: functionResponse.errorClassName,
          ...('message' in functionResponse
            ? { message: functionResponse.message }
            : {}),
        });
      }
      context.logger.debug('Bad function return type description. ');

      throw new CaseConfigurationError(
        "This interaction had a bad return type description. It must contain either a 'success' key (indicating a successful return), or a 'kind' ",
        context,
        'BAD_INTERACTION_DEFINITION',
      );
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
