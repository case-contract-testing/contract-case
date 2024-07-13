import {
  MockFunctionExecutionDescriptor,
  FunctionMockSetupInfo,
  MOCK_FUNCTION_EXECUTION,
} from '@contract-case/case-core-plugin-function-dsl';
import {
  MatchContext,
  MockData,
  addLocation,
} from '@contract-case/case-plugin-base';

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
          actual: result ? result.actualArguments : null,
          context: addLocation('functionArguments', context),
          expected: expectedArguments,
        })),
    };
  });
