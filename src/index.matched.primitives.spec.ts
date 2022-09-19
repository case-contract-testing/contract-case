import type { CaseNodeOrData } from 'core/matchers/types';
import { anyBoolean, anyNull, anyNumber, anyString } from 'dsl/Matchers';
import { checkMatch } from '.';

const expectErrorContaining = (
  matcher: CaseNodeOrData,
  example: unknown,
  expectedContent: string
) => {
  describe(`when given ${example}`, () => {
    it(`returns an error containing '${expectedContent}'`, () => {
      const matchResult = checkMatch(matcher, example);
      expect(matchResult).not.toHaveLength(0);
      expect(
        matchResult.map((m) => m.toString()).reduce((acc, m) => `${acc} ${m}`)
      ).toContain(expectedContent);
    });
  });
};
describe('basic matchers', () => {
  describe('number matcher', () => {
    const matcher = anyNumber(1);
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
    const matcher = anyString('1');
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

  describe('boolean matcher', () => {
    const matcher = anyBoolean(true);
    it('accepts true', () => {
      expect(checkMatch(matcher, true)).toStrictEqual([]);
    });
    it('accepts false', () => {
      expect(checkMatch(matcher, false)).toStrictEqual([]);
    });

    expectErrorContaining(matcher, 'true', 'not a boolean');
    expectErrorContaining(matcher, 'some string', 'not a boolean');
    expectErrorContaining(matcher, NaN, 'not a boolean');
    expectErrorContaining(matcher, Infinity, 'not a boolean');
    expectErrorContaining(matcher, 1, 'not a boolean');
    expectErrorContaining(matcher, [], 'not a boolean');
    expectErrorContaining(matcher, {}, 'not a boolean');
  });

  describe('null matcher', () => {
    const matcher = anyNull();
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
