import { anyNumber, anyString, namedMatch } from 'boundaries/dsl/Matchers';
import { CaseContract } from 'connectors/contract';
import { DEFAULT_CONFIG } from 'connectors/contract/core';

import { CaseConfigurationError } from 'entities';
import type { Logger } from 'entities/logger/types';
import type { AnyCaseNodeOrData } from 'entities/types';

const makeMockLogger: () => Logger = () => ({
  error(): void {},
  warn(): void {},
  info(): void {},
  debug(): void {},
  maintainerDebug(): void {},
});

describe('named matches', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test lookup consumer',
      providerName: 'test lookup provider',
    },
    DEFAULT_CONFIG,
    makeMockLogger
  );

  const expectErrorContaining = (
    matcher: AnyCaseNodeOrData,
    example: unknown,
    expectedContent: string
  ) => {
    describe(`when given ${example}`, () => {
      it(`returns an error containing '${expectedContent}'`, async () => {
        const matchResult = await contract.checkMatch(matcher, example);
        expect(matchResult).not.toHaveLength(0);
        expect(
          matchResult.map((m) => m.toString()).reduce((acc, m) => `${acc} ${m}`)
        ).toContain(expectedContent);
      });
    });
  };

  describe("named matcher that isn't defined yet", () => {
    const matcher = {
      a: namedMatch('some string'),
    };
    it('fails', async () => {
      await expect(
        contract.checkMatch(matcher, {
          a: 'other string',
        })
      ).rejects.toBeInstanceOf(CaseConfigurationError);
    });
  });
  describe('object matcher with a named matcher inside', () => {
    const matcher = {
      a: namedMatch('some string', anyString('string')),
    };
    it('accepts a matching object with different values', async () => {
      expect(
        await contract.checkMatch(matcher, {
          a: 'other string',
        })
      ).toStrictEqual([]);
    });
    it('strips to the expected example', () => {
      expect(contract.stripMatchers(matcher)).toEqual({ a: 'string' });
    });
    expectErrorContaining(matcher, { a: 2 }, 'string');
  });
  describe('object matcher with repeated named matches', () => {
    const matcher = {
      a: namedMatch('some number', anyNumber(1)),
      b: namedMatch('some number'),
    };
    it('accepts a matching object with different values', async () => {
      expect(
        await contract.checkMatch(matcher, {
          a: 34,
          b: 2,
        })
      ).toStrictEqual([]);
    });
    expectErrorContaining(
      matcher,
      { a: 'some string', b: 'other string' },
      'is not a number'
    );
    expectErrorContaining(
      matcher,
      { a: 1, b: 'other string' },
      'is not a number'
    );
    it('strips to the expected example', () => {
      expect(contract.stripMatchers(matcher)).toEqual({ a: 1, b: 1 });
    });
  });

  describe('object matcher with named matchers introduced earlier', () => {
    const repeatTests = (matcher: AnyCaseNodeOrData) => {
      it('accepts a matching object with different values', async () => {
        expect(
          await contract.checkMatch(matcher, {
            a: '1',
            b: 2,
          })
        ).toStrictEqual([]);
      });
      expectErrorContaining(
        matcher,
        { a: 'some string', b: 'other string' },
        'is not a number'
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a string'
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a number'
      );
      expectErrorContaining(
        matcher,
        { a: '1', b: 'other string' },
        'is not a number'
      );
      it('strips to the expected example', () => {
        expect(contract.stripMatchers(matcher)).toEqual({ a: 'string', b: 1 });
      });
    };
    describe('when raw', () => {
      repeatTests({
        a: namedMatch('some string'),
        b: namedMatch('some number'),
      });
    });

    describe('when named', () => {
      repeatTests(
        namedMatch('object example', {
          a: namedMatch('some string'),
          b: namedMatch('some number'),
        })
      );
    });
    describe('when named without content', () => {
      repeatTests(namedMatch('object example'));
    });
  });
});
