import {
  ParameterDeclaration,
  PluginDslDeclaration,
} from '../domain/typeSystem/types';

const FUNCTION_CATEGORY = 'functions';

const unnamedArguments: ParameterDeclaration = {
  name: 'arguments',
  jsonPropertyName: 'request',
  documentation: 'The arguments expected by this function.',
  type: {
    kind: 'PassToMatcher',
    exposedParams: [
      {
        name: 'arguments',
        documentation:
          'The arguments expected by this function. This should be an array containing the expectations for each parameter',
        type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
      },
    ],
    matcherReference: {
      namespace: '_case',
      name: 'FunctionArguments',
      category: FUNCTION_CATEGORY,
    },
  },
};

const returnValue: ParameterDeclaration = {
  name: 'returnValue',
  jsonPropertyName: 'response',
  documentation: 'The return value of this function.',
  type: {
    kind: 'PassToMatcher',
    exposedParams: [
      {
        name: 'returnValue',
        documentation: 'The return value of this function.',
        type: 'AnyCaseMatcherOrData',
      },
    ],
    matcherReference: {
      namespace: '_case',
      name: 'FunctionReturnValue',
      category: FUNCTION_CATEGORY,
    },
  },
};

const thrownError: ParameterDeclaration = {
  name: 'error',
  jsonPropertyName: 'response',
  documentation:
    'The error thrown by this function. Generally will be a FunctionReturnValueMatcher',
  type: {
    kind: 'PassToMatcher',
    exposedParams: [
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
    matcherReference: {
      namespace: '_case',
      name: 'FunctionThrownError',
      category: FUNCTION_CATEGORY,
    },
  },
};

const namedArguments: ParameterDeclaration = {
  name: 'arguments',
  jsonPropertyName: 'request',
  documentation: 'The arguments expected by this function.',
  type: {
    kind: 'PassToMatcher',
    exposedParams: [
      {
        name: 'invocationName',
        jsonPropertyName: '_case:matcher:uniqueName',
        documentation:
          'The name for invocation (ie, this combination of arguments). Must be unique to this specific combination of arguments',
        type: 'string',
      },
      {
        name: 'arguments',
        documentation:
          'The arguments expected by this function. This should be an array containing the expectations for each parameter',
        type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
      },
    ],
    matcherReference: {
      namespace: '_case',
      name: 'FunctionNamedArguments',
      category: FUNCTION_CATEGORY,
    },
  },
};

const functions: PluginDslDeclaration = {
  namespace: '_case',
  category: FUNCTION_CATEGORY,
  matchers: [
    {
      name: 'FunctionArguments',
      type: 'FunctionArgumentsMatcher',
      documentation: `Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution. 
      
      This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
      are a plugin author.`,
      params: [
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
      name: 'FunctionNamedArguments',
      type: 'FunctionArgumentsMatcher',
      documentation: `Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution. 

      This version names this combination of arguments, which is useful for naming specific invocations.

      This is an internal matcher used by the function interactions, you generally don't need to invoke it directly unless you
      are a plugin author.`,
      params: [
        {
          name: 'uniqueName',
          documentation: 'The unique name for this combination of arguments',
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
  ],
  interactions: [
    {
      name: 'WillReceiveFunctionCall',
      type: 'MockFunctionCaller',
      documentation: `Defines an example that expects a function to be called with specific arguments`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function to be called',
          type: 'string',
        },
        unnamedArguments,
        returnValue,
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
      name: 'WillReceiveNamedArgumentsToFunctionCall',
      type: 'MockFunctionCaller',
      documentation: `Defines an example that expects a function to be called with specific arguments`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function to be called',
          type: 'string',
        },
        namedArguments,
        returnValue,
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
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        unnamedArguments,
        returnValue,
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
      name: 'WillCallFunctionWithNamedArguments',
      type: 'MockFunctionExecution',
      documentation: `Defines an example that executes a registered function with specific arguments`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        namedArguments,
        returnValue,
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
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        unnamedArguments,
        thrownError,
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
      name: 'WillReceiveNamedArgumentsToFunctionCallAndThrow',
      type: 'MockFunctionCaller',
      documentation: `Defines an example that throws an error from a registered function with specific arguments`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        namedArguments,
        thrownError,
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
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        unnamedArguments,
        thrownError,
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
      name: 'WillCallThrowingFunctionWithNamedArguments',
      type: 'MockFunctionExecution',
      documentation: `Defines an example that throws an error from a registered function with specific arguments`,
      params: [
        {
          name: 'functionName',
          jsonPropertyName: 'functionName',
          documentation: 'The name of the function that will be called',
          type: 'string',
        },
        namedArguments,
        thrownError,
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
