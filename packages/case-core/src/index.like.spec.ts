import {
  anyBoolean,
  anyInteger,
  anyNull,
  anyNumber,
  anyString,
  exactlyLike,
  shapedLike,
} from './boundaries/dsl/Matchers';

import { CaseConfigurationError } from './entities';
import { makeExpectErrorContaining } from './__tests__/expectErrorContaining';
import { MAINTAINER_TEST_CONTEXT } from './__tests__/testContext';
import { WritingCaseContract } from './core';
import { writerDependencies } from './connectors/dependencies';
import { defaultPrinter } from './boundaries/console';

describe('basic matchers', () => {
  const contract = new WritingCaseContract(
    {
      consumerName: 'test like consumer',
      providerName: 'test like provider',
    },
    writerDependencies(defaultPrinter),
    MAINTAINER_TEST_CONTEXT
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe('number matcher', () => {
    const matcher = anyNumber(1);
    it('accepts numbers', async () => {
      expect(await contract.checkMatch(matcher, 1)).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual(1);
    });
    expectErrorContaining(matcher, NaN, 'NaN');
    expectErrorContaining(matcher, Infinity, 'finite');
    expectErrorContaining(matcher, '1', 'not a number');
    expectErrorContaining(matcher, [], 'not a number');
    expectErrorContaining(matcher, {}, 'not a number');

    it("fails when it won't actually match", async () => {
      await expect(
        contract.checkMatch(
          anyNumber(Number.POSITIVE_INFINITY),
          Number.POSITIVE_INFINITY
        )
      ).rejects.toBeInstanceOf(CaseConfigurationError);
    });
  });

  describe('integer matcher', () => {
    const matcher = anyInteger(2);
    it('accepts integers', async () => {
      expect(await contract.checkMatch(matcher, 1)).toStrictEqual([]);
    });
    it('accepts integers written as doubles', async () => {
      expect(await contract.checkMatch(matcher, 2.0)).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual(2);
    });
    expectErrorContaining(matcher, NaN, 'NaN');
    expectErrorContaining(matcher, Infinity, 'finite');
    expectErrorContaining(matcher, '1', 'not a number');
    expectErrorContaining(matcher, [], 'not a number');
    expectErrorContaining(matcher, 2.1, 'Expected an integer');
    expectErrorContaining(matcher, {}, 'not a number');
    it("fails when it won't actually match", async () => {
      await expect(
        contract.checkMatch(
          anyNumber(Number.POSITIVE_INFINITY),
          Number.POSITIVE_INFINITY
        )
      ).rejects.toBeInstanceOf(CaseConfigurationError);
    });
  });

  describe('string matcher', () => {
    const matcher = anyString('1');
    it('accepts strings that are numbers', async () => {
      expect(await contract.checkMatch(matcher, '1')).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual('1');
    });
    it('accepts strings that are not numbers', async () => {
      expect(
        await contract.checkMatch(matcher, 'example string')
      ).toStrictEqual([]);
    });
    expectErrorContaining(matcher, NaN, 'not a string');
    expectErrorContaining(matcher, Infinity, 'not a string');
    expectErrorContaining(matcher, 1, 'not a string');
    expectErrorContaining(matcher, [], 'not a string');
    expectErrorContaining(matcher, {}, 'not a string');
  });

  describe('boolean matcher', () => {
    const matcher = anyBoolean(true);
    it('accepts true', async () => {
      expect(await contract.checkMatch(matcher, true)).toStrictEqual([]);
    });
    it('accepts false', async () => {
      expect(await contract.checkMatch(matcher, false)).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual(true);
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
    it('accepts exactly null', async () => {
      expect(await contract.checkMatch(matcher, null)).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual(null);
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

  describe('shapedLike matchers', () => {
    describe('number matcher', () => {
      const matcher = shapedLike(1);
      it('accepts numbers', async () => {
        expect(await contract.checkMatch(matcher, 1)).toStrictEqual([]);
      });

      it('strips the matcher', () => {
        expect(contract.stripMatchers(matcher)).toEqual(1);
      });
      expectErrorContaining(matcher, NaN, 'NaN');
      expectErrorContaining(matcher, Infinity, 'finite');
      expectErrorContaining(matcher, '1', 'not a number');
      expectErrorContaining(matcher, [], 'not a number');
      expectErrorContaining(matcher, {}, 'not a number');
    });

    describe('string matcher', () => {
      const matcher = shapedLike('1');
      it('accepts strings that are numbers', async () => {
        expect(await contract.checkMatch(matcher, '1')).toStrictEqual([]);
      });
      it('strips the matcher', () => {
        expect(contract.stripMatchers(matcher)).toEqual('1');
      });
      it('accepts strings that are not numbers', async () => {
        expect(
          await contract.checkMatch(matcher, 'example string')
        ).toStrictEqual([]);
      });
      expectErrorContaining(matcher, NaN, 'not a string');
      expectErrorContaining(matcher, Infinity, 'not a string');
      expectErrorContaining(matcher, 1, 'not a string');
      expectErrorContaining(matcher, [], 'not a string');
      expectErrorContaining(matcher, {}, 'not a string');
    });

    describe('boolean matcher', () => {
      const matcher = shapedLike(true);
      it('accepts true', async () => {
        expect(await contract.checkMatch(matcher, true)).toStrictEqual([]);
      });
      it('accepts false', async () => {
        expect(await contract.checkMatch(matcher, false)).toStrictEqual([]);
      });
      it('returns correctly when stripped', () => {
        expect(contract.stripMatchers(matcher)).toEqual(true);
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
      const matcher = shapedLike(null);
      it('accepts exactly null', async () => {
        expect(await contract.checkMatch(matcher, null)).toStrictEqual([]);
      });
      it('returns correctly when stripped', () => {
        expect(contract.stripMatchers(matcher)).toEqual(null);
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
    const matcher = shapedLike([
      1,
      'string',
      null,
      true,
      {},
      [],
      { a: '1' },
      [1],
    ]);
    it('accepts an array of generally matched types', async () => {
      expect(
        await contract.checkMatch(matcher, [
          2,
          'other string',
          null,
          false,
          { a: 'example' },
          [],
          { a: '2' },
          [3],
        ])
      ).toStrictEqual([]);
    });
    it('returns correctly when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual([
        1,
        'string',
        null,
        true,
        {},
        [],
        { a: '1' },
        [1],
      ]);
    });
    describe('with array of generally matched types that has a different property in one of the objects', () => {
      expectErrorContaining(
        matcher,
        [2, 'other string', null, false, { a: 'example' }, [], { b: '2' }, [3]],
        "missing key 'a'"
      );
    });
    describe('with array of generally matched types that been made explicit again', () => {
      expectErrorContaining(
        shapedLike([
          1,
          'string',
          null,
          true,
          {},
          [],
          exactlyLike({ a: '1' }),
          [1],
        ]),
        [2, 'other string', null, false, { a: 'example' }, [], { a: '2' }, [3]],
        'not exactly equal'
      );
    });
  });

  describe('object matcher of explicitly matched types', () => {
    const matcher = {
      a: anyNumber(2),
      b: anyString('string'),
      c: anyNull(),
      d: anyBoolean(false),
    };
    it('accepts a matching object with different values', async () => {
      expect(
        await contract.checkMatch(matcher, {
          a: 1,
          b: 'other string',
          c: null,
          d: true,
        })
      ).toStrictEqual([]);
    });
    it('returns the correct object when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual({
        a: 2,
        b: 'string',
        c: null,
        d: false,
      });
    });
  });

  describe('with a matcher of generally matched types', () => {
    const matcher = shapedLike({
      a: 2,
      b: 'string',
      c: null,
      d: false,
    });
    it('accepts an matching object', async () => {
      expect(
        await contract.checkMatch(matcher, {
          a: 1,
          b: 'other string',
          c: null,
          d: true,
        })
      ).toStrictEqual([]);
    });
    it('returns the correct object when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual({
        a: 2,
        b: 'string',
        c: null,
        d: false,
      });
    });
  });

  describe('with an object of generally matched types that has been made exact', () => {
    const matcher = shapedLike({
      a: exactlyLike(2),
      b: exactlyLike('string'),
      c: null,
      d: exactlyLike(false),
    });
    const actual = { a: 1, b: 'other string', c: null, d: true };
    expectErrorContaining(
      matcher,
      actual,
      '1 (number) is not exactly equal to 2 (number)'
    );
    expectErrorContaining(
      matcher,
      actual,
      '"other string" (string) is not exactly equal to "string" (string)'
    );
    expectErrorContaining(
      matcher,
      actual,
      'true (boolean) is not exactly equal to false (boolean)'
    );
    it('returns the correct object when stripped', () => {
      expect(contract.stripMatchers(matcher)).toEqual({
        a: 2,
        b: 'string',
        c: null,
        d: false,
      });
    });
  });
});
