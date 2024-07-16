import {
  HasTypeForMockDescriptor,
  AnyCaseMatcher,
  BaseSetupInfo,
} from '@contract-case/case-plugin-base';

export const MOCK_FUNCTION_EXECUTION = '_case:MockFunctionExecution' as const;
export const MOCK_FUNCTION_CALLER = '_case:MockFunctionCaller' as const;

export interface MockFunctionDescriptor {
  arguments: AnyCaseMatcher[];
  returnValue: AnyCaseMatcher;
}

export interface MockFunctionCallerDescriptor
  extends HasTypeForMockDescriptor<typeof MOCK_FUNCTION_CALLER>,
    MockFunctionDescriptor {
  arguments: AnyCaseMatcher[];
  returnValue: AnyCaseMatcher;
  '_case:run:context:setup': {
    write: {
      type: typeof MOCK_FUNCTION_CALLER;
      stateVariables: 'state';
      triggers: 'generated';
    };
    read: {
      type: typeof MOCK_FUNCTION_EXECUTION;
      stateVariables: 'default';
      triggers: 'provided';
    };
  };
}

export interface MockFunctionExecutionDescriptor
  extends HasTypeForMockDescriptor<typeof MOCK_FUNCTION_EXECUTION>,
    MockFunctionDescriptor {
  '_case:run:context:setup': {
    write: {
      type: typeof MOCK_FUNCTION_EXECUTION;
      stateVariables: 'default';
      triggers: 'provided';
    };
    read: {
      type: typeof MOCK_FUNCTION_CALLER;
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

export type FunctionCallerMockSetupInfo = HasTypeForMockDescriptor<
  typeof MOCK_FUNCTION_CALLER
> &
  BaseSetupInfo & {
    functionHandle: string;
  };
