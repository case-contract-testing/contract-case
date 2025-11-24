import { PluginDslDeclaration } from '../domain/typeSystem/types';

const functions: PluginDslDeclaration = {
  namespace: '_case',
  category: 'functions',
  matchers: [
    {
      name: 'FunctionArguments',
      type: 'FunctionArgumentsMatcher',
      documentation: `Matches function arguments, for use with a MockFunctionCall / MockFunctionExecution.
 
 Usually you don't need to use this matcher directly, the mock creates it for you.`,
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
  ],
  dataObjects: [],
};

export default functions;
