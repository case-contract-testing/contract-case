import { MatcherDslDeclaration } from '../domain/typeSystem/types';

export type PluginDslDeclaration = {
  /**
   * The author's namespace for this matcher.
   * This is the prefix that the type
   * constants in this package will have.
   */
  namespace: string;
  /** The category within the namespace,
   * used for grouping related matchers
   * together (eg arrays) */
  category: string;
  matchers: MatcherDslDeclaration[];
};

const matcherDefinition: MatcherDslDeclaration = {
  name: 'ArrayEachEntryMatches',
  type: 'ArrayEachEntryLike',
  documentation:
    'Matches an array where each element matches the provided matcher.',
  params: [
    {
      name: 'matcher',
      documentation: 'The matcher to match against each element of the array.',
      type: 'AnyCaseMatcherOrData',
    },
    {
      name: 'example',
      documentation: 'Example data to use instead of the generated one',
      type: { kind: 'array', type: 'AnyData' },
      optional: true,
    },
  ],
};

const matcherContainsDefinition: MatcherDslDeclaration = {
  name: 'ArrayContains',
  type: 'ArrayContains',
  documentation:
    'Matches an Array which contains elements that match the given matchers. Note that two different matchers may be satisfied by the same item in the array.',
  params: [
    {
      name: 'matchers',
      documentation:
        'Any number of matchers, each of which must be found inside the array, in any order.',
      type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
    },
  ],
};

const arrays: PluginDslDeclaration = {
  namespace: '_case',
  category: 'arrays',
  matchers: [matcherContainsDefinition, matcherDefinition],
};

export default arrays;
