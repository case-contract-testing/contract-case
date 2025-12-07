import { PluginDslDeclaration } from '../domain/typeSystem/types';

const functions: PluginDslDeclaration = {
  namespace: '_case',
  category: 'functions',
  matchers: [
    {
      name: 'FunctionArguments',
      type: 'FunctionArgumentsMatcher',
      documentation: `Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation:
            'The name of the function to match the arguments against.',
          type: 'string',
        },
        {
          name: 'arguments',
          jsonPropertyName: 'arguments',
          documentation:
            'An array of matchers that describe the expected function arguments in order.',
          type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
        },
      ],
    },
    {
      name: 'FunctionReturnValue',
      type: 'FunctionResultMatcher',
      documentation: `Matches function return values, for use with a MockFunctionCall / MockFunctionExecution.`,
      params: [
        {
          name: 'returnValue',
          jsonPropertyName: 'success',
          documentation: 'The return value of this function',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'NamedFunctionReturnValue',
      type: 'FunctionResultMatcher',
      documentation: `Matches function return values, for use with a MockFunctionCall / MockFunctionExecution.`,
      params: [
        {
          name: 'uniqueName',
          documentation:
            'The name of this return value. Must be unique within this contract',
          type: 'string',
        },
        {
          name: 'returnValue',
          jsonPropertyName: 'success',
          documentation: 'The return value of this function',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'FunctionThrownError',
      type: 'FunctionResultMatcher',
      documentation: `Matches errors thrown from a function execution, for use with a MockFunctionCall / MockFunctionExecution.`,
      params: [
        {
          name: 'errorClassName',
          jsonPropertyName: 'errorClassName',
          documentation:
            'The class name for the expected error (must resolve to a string)',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'message',
          jsonPropertyName: 'message',
          documentation: 'The message for the expected error, if any',
          optional: true,
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'NamedFunctionThrownError',
      type: 'FunctionResultMatcher',
      documentation: `Matches errors thrown from a function execution, for use with a MockFunctionCall / MockFunctionExecution.`,
      params: [
        {
          name: 'uniqueName',
          documentation:
            'The name of this error. Must be unique within this contract',
          type: 'string',
        },
        {
          name: 'errorClassName',
          jsonPropertyName: 'errorClassName',
          documentation: 'The class name for the expected error',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'message',
          jsonPropertyName: 'message',
          documentation: 'The message for the expected error, if any',
          optional: true,
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
  ],
  interactions: [
    {
      name: 'WillReceiveFunctionCall',
      type: 'MockFunctionCaller',
      documentation: `Defines an example that expects a function to be called with specific arguments`,
      params: [
        {
          name: 'arguments',
          jsonPropertyName: 'request',
          documentation:
            'The arguments expected by this function. Generally will be a FunctionArgumentsMatcher',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'returnValue',
          jsonPropertyName: 'response',
          documentation:
            'The return value of this function. Generally will be a FunctionReturnValueMatcher',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockFunctionCaller',
          stateVariables: 'state',
          triggers: 'generated',
        },
        read: {
          type: '_case:MockFunctionExecution',
          stateVariables: 'default',
          triggers: 'provided',
        },
      },
    },
    {
      name: 'WillCallFunction',
      type: 'MockFunctionExecution',
      documentation: `Defines an example that executes a registered function with specific arguments`,
      params: [
        {
          name: 'arguments',
          jsonPropertyName: 'request',
          documentation:
            'The arguments expected by this function. Generally will be a FunctionArgumentsMatcher',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'returnValue',
          jsonPropertyName: 'response',
          documentation:
            'The return value of this function. Generally will be a FunctionReturnValueMatcher',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockFunctionExecution',
          stateVariables: 'default',
          triggers: 'provided',
        },
        read: {
          type: '_case:MockFunctionCaller',
          stateVariables: 'state',
          triggers: 'generated',
        },
      },
    },
    {
      name: 'WillReceiveFunctionCallAndThrow',
      type: 'MockFunctionCaller',
      documentation: `Defines an example that throws an error from a registered function with specific arguments`,
      params: [
        {
          name: 'arguments',
          jsonPropertyName: 'request',
          documentation:
            'The arguments expected by this function. Generally will be a FunctionArgumentsMatcher',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'error',
          jsonPropertyName: 'response',
          documentation:
            'The error thrown by this function. Generally will be a FunctionThrownError or a NamedFunctionThrownError',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockFunctionCaller',
          stateVariables: 'state',
          triggers: 'generated',
        },
        read: {
          type: '_case:MockFunctionExecution',
          stateVariables: 'default',
          triggers: 'provided',
        },
      },
    },
    {
      name: 'WillCallThrowingFunction',
      type: 'MockFunctionExecution',
      documentation: `Defines an example that throws an error from a registered function with specific arguments`,
      params: [
        {
          name: 'arguments',
          jsonPropertyName: 'request',
          documentation:
            'The arguments expected by this function. Generally will be a FunctionArgumentsMatcher',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'error',
          jsonPropertyName: 'response',
          documentation:
            'The error thrown by this function. Generally will be a FunctionReturnValueMatcher',
          type: 'AnyCaseMatcherOrData',
        },
      ],
      setup: {
        write: {
          type: '_case:MockFunctionExecution',
          stateVariables: 'default',
          triggers: 'provided',
        },
        read: {
          type: '_case:MockFunctionCaller',
          stateVariables: 'state',
          triggers: 'generated',
        },
      },
    },
  ],
};

export default functions;
