import { PluginDslDeclaration } from '../domain/typeSystem/types';

const primitives: PluginDslDeclaration = {
  namespace: '_case',
  category: 'primitives',
  matchers: [
    {
      name: 'AnyBoolean',
      type: 'MatchBoolean',
      documentation: `Matches any Boolean`,
      params: [
        {
          name: 'example',
          documentation: 'An example boolean to use during contract definition',
          type: 'boolean',
        },
      ],
      contextModifiers: {
        matchBy: 'type',
      },
    },
    {
      name: 'AnyInteger',
      type: 'Integer',
      documentation: `Matches any integer. 
      
      Use this when your code expects an integer, but you don't care what it is.`,
      params: [
        {
          name: 'example',
          documentation: 'An example integer to use during contract definition',
          type: 'integer',
        },
      ],
      contextModifiers: {
        matchBy: 'type',
      },
    },
    {
      name: 'AnyNull',
      type: 'MatchNull',
      documentation: `Matches any null. 
      
      How many is that? Well, one, probably.
      
      Use this when you want to make a Trillion Dollar Mistake.`,
      params: [],
      constantParams: {
        example: null,
        resolvesTo: 'null',
      },
      contextModifiers: {
        matchBy: 'type',
      },
    },
    {
      name: 'AnyNumber',
      type: 'MatchNumber',
      documentation: `Matches any number`,
      params: [
        {
          name: 'example',
          documentation: 'An example number',
          type: 'number',
        },
      ],
      constantParams: {
        resolvesTo: 'number',
      },
      contextModifiers: {
        matchBy: 'type',
      },
    },
  ],
  interactions: [],
};

export default primitives;
