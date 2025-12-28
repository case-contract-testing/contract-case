import { LanguageGenerator } from '../types';
import { javaGenerator } from './java/javaGenerator';
import { tsGenerator } from './ts/tsGenerator';

describe.each([
  { generator: tsGenerator, name: 'typescript' },
  { generator: javaGenerator, name: 'java' },
])(
  'Language generator for $java',
  ({ generator }: { generator: LanguageGenerator }) => {
    it('generates a matcher as expected', async () => {
      expect(
        await generator.generateDslCode(
          {
            kind: 'matcher',
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
              {
                name: 'example',
                documentation:
                  'Example data to use instead of the generated one',
                type: { kind: 'array', type: 'AnyData' },
                optional: true,
              },
            ],
          },
          'tests',
          '_case',
        ),
      ).toMatchSnapshot();
    });

    it('works for the other case too', async () => {
      expect(
        (
          await generator.generateDslCode(
            {
              kind: 'matcher',
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
            },
            'tests',
            '_case',
          )
        ).content,
      ).toMatchSnapshot();
    });
  },
);
