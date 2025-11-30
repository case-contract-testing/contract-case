import {
  HasTypeForMockDescriptor,
  AnyCaseMatcher,
  BaseSetupInfo,
} from '@contract-case/case-plugin-dsl-types';

export const MOCK_FUNCTION_EXECUTION = '_case:MockFunctionExecution' as const;
export const MOCK_FUNCTION_CALLER = '_case:MockFunctionCaller' as const;

/**
 * Describes a function that successfully returns a response
 *
 * This is a convenience type that is common to all the descriptors in this plugin
 */
export interface MockFunctionDescriptor {
  /** The arguments */
  request: AnyCaseMatcher;
  /** The return value */
  response: AnyCaseMatcher;
  /** The name of the function, for use as a handle by `registerFunction` */
  functionName: string;
}

export interface ThrownError {
  /** The type of the error response (ie, the class name of the exception) */
  kind: AnyCaseMatcher;
  /**
   * The error message, if any
   */
  message?: AnyCaseMatcher;
  /**
   * The stack trace, as one whole string. Available for debugging, but not for matching.
   */
  stack?: string;
}

export type FunctionResponse = ThrownError | { success: AnyCaseMatcher };

export interface MockFunctionCallerDescriptor
  extends HasTypeForMockDescriptor<typeof MOCK_FUNCTION_CALLER>,
    MockFunctionDescriptor {
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
  BaseSetupInfo;

export type FunctionCallerMockSetupInfo = HasTypeForMockDescriptor<
  typeof MOCK_FUNCTION_CALLER
> &
  BaseSetupInfo;
