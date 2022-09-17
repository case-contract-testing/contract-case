import { number, string } from 'dsl/Matchers';
import type { AnyMatcher } from 'dsl/Matchers/types';
import { checkMatch } from '.';

const expectErrorContaining = (
  matcher: AnyMatcher,
  example: unknown,
  expectedContent: string
) => {
  describe(`when given ${example}`, () => {
    it(`returns an error containing '${expectedContent}'`, () => {
      const matchResult = checkMatch(matcher, example);
      expect(matchResult).not.toHaveLength(0);
      expect(
        matchResult.map((m) => m.message).reduce((acc, m) => `${acc} ${m}`)
      ).toContain(expectedContent);
    });
  });
};
describe('basic matchers', () => {
  describe('number matcher', () => {
    const matcher = number(1);
    it('accepts numbers', () => {
      expect(checkMatch(matcher, 1)).toStrictEqual([]);
    });
    expectErrorContaining(matcher, NaN, 'NaN');
    expectErrorContaining(matcher, Infinity, 'finite');
    expectErrorContaining(matcher, '1', 'not a number');
    expectErrorContaining(matcher, [], 'not a number');
    expectErrorContaining(matcher, {}, 'not a number');
  });

  describe('string matcher', () => {
    const matcher = string('1');
    it('accepts strings that are numbers', () => {
      expect(checkMatch(matcher, '1')).toStrictEqual([]);
    });
    it('accepts strings that are not numbers', () => {
      expect(checkMatch(matcher, 'example string')).toStrictEqual([]);
    });
    expectErrorContaining(matcher, NaN, 'not a string');
    expectErrorContaining(matcher, Infinity, 'not a string');
    expectErrorContaining(matcher, 1, 'not a string');
    expectErrorContaining(matcher, [], 'not a string');
    expectErrorContaining(matcher, {}, 'not a string');
  });
});
