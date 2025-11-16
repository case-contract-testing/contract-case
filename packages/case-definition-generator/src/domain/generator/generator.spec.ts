import { generateDslCode } from './ts/tsGenerator';
import { generateJavaDslCode } from './java/javaGenerator';
import { MatcherDslDeclaration } from '../typeSystem/types';

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

describe('generator', () => {
  describe('typescript', () => {
    it('generates a matcher as expected', () => {
      expect(generateDslCode(matcherDefinition, '_case')).toBe(`
import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';

// Constant
export const ARRAY_EACH_ENTRY_LIKE_TYPE = '_case:ArrayEachEntryLike' as const;

// Interface
export interface CoreArrayEachEntryMatchesMatches {
  '_case:matcher:type': typeof ARRAY_EACH_ENTRY_LIKE_TYPE;
  '_case:matcher:matcher': AnyCaseMatcherOrData;
  '_case:matcher:example'?: AnyData[];
}

// Factory Function
/**
 * Matches an array where each element matches the provided matcher.
 *
 * @param matcher - The matcher to match against each element of the array.
 * @param example - Example data to use instead of the generated one
 */
export const arrayEachEntryMatches = (matcher: AnyCaseMatcherOrData, example?: AnyData[]): CoreArrayEachEntryMatchesMatches => ({
  '_case:matcher:type': ARRAY_EACH_ENTRY_LIKE_TYPE,
  '_case:matcher:matcher': matcher,
  ...(example !== undefined ? { '_case:matcher:example': example } : {}),
});
`);
    });
  });
  describe('java', () => {
    it('generates a matcher as expected', async () => {
      expect(
        (await generateJavaDslCode(matcherDefinition, 'tests', '_case'))
          .content,
      ).toMatchSnapshot();
    });
    it('works for the other case too', async () => {
      expect(
        (await generateJavaDslCode(matcherContainsDefinition, 'tests', '_case'))
          .content,
      ).toMatchSnapshot();
    });
  });
});
