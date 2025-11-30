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
};

export default functions;
