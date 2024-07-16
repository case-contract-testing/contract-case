import {
  MockFunctionDescriptor,
  MOCK_FUNCTION_EXECUTION,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import { AllSetup } from './types';

export const setupMockFunctionExecution = (
  { arguments: expectedArguments, returnValue }: MockFunctionDescriptor,
  parentContext: MatchContext,
): Promise<MockData<AllSetup, typeof MOCK_FUNCTION_EXECUTION>> =>
  Promise.resolve(addLocation('mockFunction', parentContext)).then(
    (context) => {
      // create mock function
      let data: { actualArguments: unknown[] } | null = null;

      const f = (...actualArguments: unknown[]) => {
        data = { actualArguments };

        context.logger.debug(
          'Mock function was invoked with arguments:',
          actualArguments,
        );

        const strippedReturnValue = context.descendAndStrip(
          returnValue,
          addLocation('returnValue', context),
        );
        context.logger.debug('Returning', strippedReturnValue);
        return strippedReturnValue;
      };

      return {
        config: {
          '_case:mock:type': MOCK_FUNCTION_EXECUTION,
          variables: context['_case:currentRun:context:variables'],
          invokeable: f,
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
    },
  );
