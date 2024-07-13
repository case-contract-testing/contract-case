import {
  HasTypeForMockDescriptor,
  AnyCaseMatcher,
  BaseSetupInfo,
} from '@contract-case/case-plugin-base';

export const MOCK_FUNCTION_EXECUTION = '_case:MockFunctionExecution' as const;
export const MOCK_FUNCTION_INVOCATION = '_case:MockFunctionExecution' as const;

export interface MockFunctionExecutionDescriptor
  extends HasTypeForMockDescriptor<typeof MOCK_FUNCTION_EXECUTION> {
  arguments: AnyCaseMatcher[];
  returnValue: AnyCaseMatcher;
  '_case:run:context:setup': {
    write: {
      type: typeof MOCK_FUNCTION_EXECUTION;
      stateVariables: 'default';
      triggers: 'provided';
    };
    read: {
      type: typeof MOCK_FUNCTION_INVOCATION;
      stateVariables: 'state';
      triggers: 'generated';
    };
  };
}

export type FunctionMockSetupInfo = HasTypeForMockDescriptor<
  typeof MOCK_FUNCTION_EXECUTION
> &
  BaseSetupInfo & {
    invokeable: (...invokedArguments: unknown[]) => unknown;
  };
