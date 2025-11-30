import { PluginDslDeclaration } from '../domain/typeSystem/types';

const objects: PluginDslDeclaration = {
  namespace: '_case',
  category: 'objects',
  matchers: [
    {
      name: 'ObjectEachKeyMatches',
      type: 'ObjectKeysMatch',
      documentation: `Matches an object where each key matches the provided matcher`,
      params: [
        {
          name: 'matcher',
          documentation: 'The matcher that all keys must pass',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'ObjectEachValueMatches',
      type: 'ObjectValuesMatch',
      documentation: `Matches an object where each value matches the provided matcher`,
      params: [
        {
          name: 'matcher',
          documentation: 'The matcher that all values must pass',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
  ],
  interactions: [],
};

export default objects;
