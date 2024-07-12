import {
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';
import {
  FunctionMockSetupInfo,
  MOCK_FUNCTION_EXECUTION,
  MockFunctionExecutionDescriptor,
} from '../dsl/types';

export const setupMockFunctionExecution = (
  {
    arguments: expectedArguments,
    returnValue,
  }: MockFunctionExecutionDescriptor,
  context: MatchContext,
): Promise<MockData<FunctionMockSetupInfo, typeof MOCK_FUNCTION_EXECUTION>> =>
  Promise.resolve().then(() => {
    // create mock function
    let data: { actualArguments: unknown[] } | null = null;

    const f = (...actualArguments: unknown[]) => {
      data = { actualArguments };
      return context.descendAndStrip(
        returnValue,
        addLocation('returnValue', context),
      );
    };

    return {
      config: {
        '_case:mock:type': MOCK_FUNCTION_EXECUTION,
        variables: context['_case:currentRun:context:variables'],
        invokeable: f,
      },
      assertableData: () =>
        Promise.resolve(data).then((result) => ({
          actual: result,
          context: addLocation('response', context),
          expected: expectedArguments,
        })),
    };
  });
