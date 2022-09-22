import type { AnyLeafMatcher, AnyJson } from 'core/matchers/types';
import { checkMatch } from '.';

const expectErrorContaining = (
  matcher: AnyLeafMatcher | AnyJson,
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

describe('exact matches', () => {
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
  describe('array matchers', () => {
    it('accepts an empty array', () => {
      expect(checkMatch([], [])).toStrictEqual([]);
    });

    describe.each<any>(['', 1, 'string', '1', false, true, {}, { a: 'b' }])(
      "when given '%s'",
      (example) => {
        expectErrorContaining([], example, 'not an array');
      }
    );

    it('accepts an array of exact types', () => {
      expect(
        checkMatch([1, 'string', null, true], [1, 'string', null, true])
      ).toStrictEqual([]);
    });

    expectErrorContaining(
      [1, 'string', null, true],
      ['1', 'string', null, true],
      'not exactly equal'
    );

    expectErrorContaining(
      [1, 'string', null, true],
      [1, 'other string', null, true],
      'not exactly equal'
    );

    expectErrorContaining(
      [1, 'string', null, true],
      [1, 'string', false, true],
      'not null'
    );

    expectErrorContaining(
      [1, 'string', null, true],
      [1, 'string', false, false],
      'not exactly equal'
    );

    expectErrorContaining(
      [1, 'string', null, true],
      [1, 'string', true],
      'different lengths'
    );
    expectErrorContaining([1], [], 'different lengths');
    expectErrorContaining([], [1], 'different lengths');
  });
});
