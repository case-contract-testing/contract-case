import { CaseContract } from 'boundaries';
import { objectEachValueMatches } from 'boundaries/dsl/Matchers';
import { DEFAULT_CONFIG } from 'connectors/contract/core';
import { makeNoErrorResult } from 'entities/results';
import type { AnyCaseNodeOrData } from 'entities/types';

describe('basic types and structure checks', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test object consumer',
      providerName: 'test object provider',
    },
    DEFAULT_CONFIG
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
          matchResult
            .map((m) => m.toString())
            .reduce((acc, m) => `${acc} ${m}`, '')
        ).toContain(expectedContent);
      });
    });
  };

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
