import type { AnyMatcher, AnyJson } from 'core/matchers/types';
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
    expectErrorContaining(matcher, 2, 'not exactly equal ');
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

  describe('null', () => {
    const matcher = null;
    it('accepts exactly null', () => {
      expect(checkMatch(matcher, null)).toStrictEqual([]);
    });

    expectErrorContaining(matcher, true, 'not null');
    expectErrorContaining(matcher, false, 'not null');
    expectErrorContaining(matcher, '1', 'not null');
    expectErrorContaining(matcher, 'some other string', 'not null');
    expectErrorContaining(matcher, NaN, 'not null');
    expectErrorContaining(matcher, Infinity, 'not null');
    expectErrorContaining(matcher, 1, 'not null');
    expectErrorContaining(matcher, [], 'not null');
    expectErrorContaining(matcher, {}, 'not null');
  });
});
