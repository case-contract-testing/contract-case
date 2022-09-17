import type { AnyMatcher } from 'dsl/Matchers/types';
import type { AnyJson } from 'dsl/types';
import { checkMatch } from '.';

const expectErrorContaining = (
  matcher: AnyMatcher | AnyJson,
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
describe('basic primitives', () => {
  describe('number', () => {
    const matcher = 1;
    it('accepts the exact example', () => {
      expect(checkMatch(matcher, 1)).toStrictEqual([]);
    });
    expectErrorContaining(matcher, 2, 'not exactly equal');
    expectErrorContaining(matcher, NaN, 'not exactly equal');
    expectErrorContaining(matcher, Infinity, 'not exactly equal');
    expectErrorContaining(matcher, '1', 'not exactly equal');
    expectErrorContaining(matcher, [], 'not exactly equal');
    expectErrorContaining(matcher, {}, 'not exactly equal');
  });

  describe('string', () => {
    const matcher = 'example string';
    it('accepts exactly the string', () => {
      expect(checkMatch(matcher, 'example string')).toStrictEqual([]);
    });

    expectErrorContaining(matcher, '1', 'not exactly equal');
    expectErrorContaining(matcher, 'some other string', 'not exactly equal');
    expectErrorContaining(matcher, NaN, 'not exactly equal');
    expectErrorContaining(matcher, Infinity, 'not exactly equal');
    expectErrorContaining(matcher, 1, 'not exactly equal');
    expectErrorContaining(matcher, [], 'not exactly equal');
    expectErrorContaining(matcher, {}, 'not exactly equal');
  });

  describe('boolean', () => {
    const matcher = true;
    it('accepts exactly true', () => {
      expect(checkMatch(matcher, true)).toStrictEqual([]);
    });

    expectErrorContaining(matcher, false, 'not exactly equal');
    expectErrorContaining(matcher, '1', 'not exactly equal');
    expectErrorContaining(matcher, 'some other string', 'not exactly equal');
    expectErrorContaining(matcher, NaN, 'not exactly equal');
    expectErrorContaining(matcher, Infinity, 'not exactly equal');
    expectErrorContaining(matcher, 1, 'not exactly equal');
    expectErrorContaining(matcher, [], 'not exactly equal');
    expectErrorContaining(matcher, {}, 'not exactly equal');
  });
});
