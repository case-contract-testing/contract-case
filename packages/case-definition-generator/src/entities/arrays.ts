import { PluginDslDeclaration } from '../domain/typeSystem/types';

const arrays: PluginDslDeclaration = {
  namespace: '_case',
  category: 'arrays',
  matchers: [
    {
      name: 'ArrayContains',
      type: 'ArrayContains',
      documentation: `Matches an Array which contains all the elements 
  that match the given matchers.
  Note that two different matchers may be satisfied by the same item in the array.`,
      params: [
        {
          name: 'matchers',
          documentation: `Any number of matchers,
      each of which must be found inside the array, in any order.`,
          type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
        },
      ],
    },
    {
      name: 'ArrayEachEntryMatches',
      type: 'ArrayEachEntryLike',
      documentation:
        'Matches an array where each element matches the provided matcher.',
      params: [
        {
          name: 'matcher',
          documentation:
            'The matcher to match against each element of the array.',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'ArrayEachEntryMatchesWithExample',
      type: 'ArrayEachEntryLike',
      documentation:
        'Matches an array where each element matches the provided matcher. This is like ArrayEachEntryMatches, but you can override the example.',
      params: [
        {
          name: 'matcher',
          documentation:
            'The matcher to match against each element of the array.',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'example',
          documentation: 'Example data to use instead of the generated one',
          type: { kind: 'array', type: 'AnyData' },
        },
      ],
    },
    {
      name: 'ArrayLength',
      type: 'ArrayLength',
      documentation:
        'Matches an Array whose length is within the specified range (or 1-infinity if not specified).',
      params: [
        {
          name: 'minLength',
          documentation: `The minimum length for the array. Must be greater than zero, 
            otherwise empty arrays pass, which means you wouldn't be testing the array contents.`,
          type: 'integer',
          optional: true,
        },
        {
          name: 'maxLength',
          documentation:
            'The maximum length for the array. Must be greater than minimum length',
          type: 'integer',
          optional: true,
        },
      ],
    },

    {
      name: 'ArrayStartsWith',
      type: 'ArrayShape',
      documentation:
        'Matches an Array which starts with the provided array of matchers - any additional elements in the array are ignored.',
      params: [
        {
          name: 'children',
          documentation: `An array of matchers that describes the start of the array. Additional elements in the actual array are ignored.`,
          type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
          optional: true,
        },
      ],
    },
  ],
  interactions: [],
};

export default arrays;
