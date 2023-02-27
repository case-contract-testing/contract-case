import { CaseContract } from 'boundaries';
import {
  anyNumber,
  anyString,
  arrayContains,
  arrayEachEntryMatches,
  arrayLength,
  arrayStartsWith,
  objectEachValueMatches,
  shapedLike,
  withExample,
} from 'boundaries/dsl/Matchers';
import { CaseConfigurationError } from 'entities';
import { makeNoErrorResult } from 'entities/results';
import { StripUnsupportedError } from 'entities/errors/StripUnsupportedError';
import {
  MAINTAINER_TEST_CONTEXT,
  makeExpectErrorContaining,
} from '__tests__/expectErrorContaining';

describe('basic types and structure checks', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test array consumer',
      providerName: 'test array provider',
    },
    MAINTAINER_TEST_CONTEXT
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe('array each like', () => {
    describe('with a single primitive matcher', () => {
      const matcher = arrayEachEntryMatches(1);
      it('accepts an array with extra values', async () => {
        expect(await contract.checkMatch(matcher, [1, 1, 1, 1])).toStrictEqual(
          makeNoErrorResult()
        );
      });

      it('accepts an array with one value', async () => {
        expect(await contract.checkMatch(matcher, [1, 1, 1, 1])).toStrictEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(matcher, [], 'Expected a non-empty array');
      expectErrorContaining(matcher, [2], 'not exactly equal');
      expectErrorContaining(matcher, [1, 1, true], 'not exactly equal');

      it('strips matchers with one example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([1]);
      });
    });

    describe('with a single primitive matcher and an example', () => {
      const matcher = arrayEachEntryMatches(1, [1, 1, 1]);
      it('accepts an array with extra values', async () => {
        expect(await contract.checkMatch(matcher, [1, 1, 1, 1])).toStrictEqual(
          makeNoErrorResult()
        );
      });

      it('accepts an array with one value', async () => {
        expect(await contract.checkMatch(matcher, [1, 1, 1, 1])).toStrictEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(matcher, [], 'Expected a non-empty array');
      expectErrorContaining(matcher, [2], 'not exactly equal');
      expectErrorContaining(matcher, [1, 1, true], 'not exactly equal');

      it('strips matchers with the provided example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([1, 1, 1]);
      });
    });
    describe('with a complex matcher and an example', () => {
      const matcher = arrayEachEntryMatches(
        shapedLike({ someString: anyString(), someNumber: anyNumber() })
      );
      it('accepts an array with extra values', async () => {
        expect(
          await contract.checkMatch(matcher, [
            { someString: 'a', someNumber: 1 },
            { someString: 'b', someNumber: 3 },
            { someString: 'b', someNumber: 3, someOtherProperty: 'foo' },
          ])
        ).toStrictEqual(makeNoErrorResult());
      });

      it('accepts an array with one value', async () => {
        expect(
          await contract.checkMatch(matcher, [
            { someString: 'a', someNumber: 1 },
          ])
        ).toStrictEqual(makeNoErrorResult());
      });
      expectErrorContaining(matcher, [], 'Expected a non-empty array');
      expectErrorContaining(matcher, [2], 'Expected an object');
      expectErrorContaining(
        matcher,
        [{ someString: 'a', someNumber: '1' }],
        'not a number'
      );

      it('strips matchers with the provided example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([
          { someString: 'someString', someNumber: 1.1 },
        ]);
      });
    });
  });

  describe('array starts with', () => {
    it('accepts an array with extra values', async () => {
      expect(
        await contract.checkMatch(arrayStartsWith([1, 'string', null]), [
          1,
          'string',
          null,
          true,
        ])
      ).toStrictEqual([]);
    });

    expectErrorContaining(
      arrayStartsWith([1, 'string', null]),
      [1, 'other string'],
      'Array has different lengths'
    );
  });

  describe('array contains', () => {
    describe('with a single primitive matcher', () => {
      const matcher = arrayContains(1);
      it('accepts an array with extra matching values', async () => {
        expect(await contract.checkMatch(matcher, [1, 1, 1, 1])).toStrictEqual(
          makeNoErrorResult()
        );
      });

      it('accepts an array with extra non matching values', async () => {
        expect(
          await contract.checkMatch(matcher, ['1', 1, 3, 4])
        ).toStrictEqual(makeNoErrorResult());
      });

      it('accepts an array with one value', async () => {
        expect(await contract.checkMatch(matcher, [1])).toStrictEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(matcher, [], 'the array was empty');
      expectErrorContaining(matcher, [2], 'not exactly equal');

      it('strips matchers with one example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([1]);
      });
    });

    describe('with nested array examples', () => {
      const matcher = arrayContains(1, [1, 2, 3]);
      it('accepts an array with extra values', async () => {
        expect(
          await contract.checkMatch(matcher, [
            'foo',
            { other: 'thing' },
            [1, 2, 3],
            1,
            '',
          ])
        ).toStrictEqual(makeNoErrorResult());
      });

      it('accepts an array with one value', async () => {
        expect(
          await contract.checkMatch(matcher, [1, [1, 2, 3]])
        ).toStrictEqual(makeNoErrorResult());
      });
      expectErrorContaining(matcher, [], 'array was empty');
      expectErrorContaining(matcher, [2], 'not exactly equal');
      expectErrorContaining(matcher, [1, 1, true], 'is not an array');

      it('strips matchers with the provided example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([1, [1, 2, 3]]);
      });
    });
    describe('with a complex matcher and an example', () => {
      const matcher = arrayContains(
        shapedLike({ someString: anyString(), someNumber: anyNumber() })
      );
      it('accepts an array with extra values', async () => {
        expect(
          await contract.checkMatch(matcher, [
            { someString: 'a', someNumber: 1 },
            { someString: 'b', someNumber: 3 },
            { someString: 'b', someNumber: 3, someOtherProperty: 'foo' },
          ])
        ).toStrictEqual(makeNoErrorResult());
      });

      it('accepts an array with one value', async () => {
        expect(
          await contract.checkMatch(matcher, [
            { someString: 'a', someNumber: 1 },
          ])
        ).toStrictEqual(makeNoErrorResult());
      });
      expectErrorContaining(matcher, [], 'the array was empty');
      expectErrorContaining(matcher, [2], 'Expected an object');
      expectErrorContaining(
        matcher,
        [{ someString: 'a', someNumber: '1' }],
        'not a number'
      );

      it('strips matchers with the provided example', () => {
        expect(contract.stripMatchers(matcher)).toEqual([
          { someString: 'someString', someNumber: 1.1 },
        ]);
      });
    });
  });

  describe('array length', () => {
    describe('with no parameters', () => {
      const matcher = withExample(arrayLength({}), ["I don't care about this"]);

      it('matches an array of length 1', async () => {
        await expect(contract.checkMatch(matcher, [1])).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      describe('on an empty array', () => {
        expectErrorContaining(matcher, [], 'under the minimum length');
      });
    });

    describe('Refused examples', () => {
      it('refuses with an empty array example', async () => {
        await expect(
          contract.checkMatch(withExample(arrayLength({ maxLength: 2 }), []), [
            1,
          ])
        ).rejects.toBeInstanceOf(CaseConfigurationError);
      });

      it('refuses with an too long array example', async () => {
        await expect(
          contract.checkMatch(
            withExample(arrayLength({ maxLength: 2 }), [1, 2, 3]),
            [1]
          )
        ).rejects.toBeInstanceOf(CaseConfigurationError);
      });

      it('refuses with an too short array example', async () => {
        await expect(
          contract.checkMatch(withExample(arrayLength({ minLength: 2 }), [1]), [
            1,
          ])
        ).rejects.toBeInstanceOf(CaseConfigurationError);
      });

      it("can't strip matchers without an example", () => {
        expect(() => {
          contract.stripMatchers(arrayLength({ maxLength: 2 }));
        }).toThrow(StripUnsupportedError);
      });
    });
    describe('with a maximum length', () => {
      const matcher = withExample(arrayLength({ maxLength: 2 }), [1]);

      it('matches an array of length 1', async () => {
        await expect(contract.checkMatch(matcher, [1])).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      it('matches an array of length 2', async () => {
        await expect(contract.checkMatch(matcher, [1, 2])).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      describe('on an empty array', () => {
        expectErrorContaining(matcher, [], 'under the minimum length');
      });

      describe('on an array of length 3', () => {
        expectErrorContaining(matcher, [1, 2, 3], 'over the maximum length');
      });
    });

    describe('with a maximum and a minimum length', () => {
      const matcher = withExample(arrayLength({ maxLength: 3, minLength: 2 }), [
        '3',
        '5',
      ]);

      it('matches an array of length 3', async () => {
        await expect(contract.checkMatch(matcher, [1, 2, 3])).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      it('matches an array of length 2', async () => {
        await expect(contract.checkMatch(matcher, [1, 2])).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      describe('on an empty array', () => {
        expectErrorContaining(matcher, [], 'under the minimum length');
      });

      describe('on an array of length 2', () => {
        expectErrorContaining(matcher, [1], 'under the minimum length');
      });

      describe('on an array of length 3', () => {
        expectErrorContaining(matcher, [1, 2, 3, 4], 'over the maximum length');
      });
    });
  });

  describe('object each value', () => {
    const matcher = objectEachValueMatches('exact string');
    it('accepts an object with one value', async () => {
      expect(
        await contract.checkMatch(matcher, { someKey: 'exact string' })
      ).toStrictEqual(makeNoErrorResult());
    });

    it('accepts an object with multiple values', async () => {
      expect(
        await contract.checkMatch(matcher, {
          someKey: 'exact string',
          someOtherKey: 'exact string',
        })
      ).toStrictEqual(makeNoErrorResult());
    });

    expectErrorContaining(matcher, {}, 'at least one key property');
    expectErrorContaining(matcher, { someKey: 1 }, 'not a string');
  });
});
