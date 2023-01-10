import { and, arrayLength, shapedLike } from 'boundaries/dsl/Matchers';
import { CaseContract } from 'connectors/contract';
import { DEFAULT_CONFIG } from 'connectors/contract/core';

import { makeNoErrorResult } from 'entities/results';
import type { AnyCaseNodeOrData } from 'entities/types';

describe('named matches', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test aux consumer',
      providerName: 'test aux provider',
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

        expect(
          matchResult
            .map((m) => m.toString())
            .reduce((acc, m) => `${acc} ${m}`, '')
        ).toContain(expectedContent);
      });
    });
  };

  describe('And matcher', () => {
    const matcher = and(arrayLength({ maxLength: 2 }), shapedLike([1]));

    it('matches an array of length 1', async () => {
      await expect(contract.checkMatch(matcher, [2])).resolves.toEqual(
        makeNoErrorResult()
      );
    });
    it('can strip matchers', () => {
      expect(contract.stripMatchers(matcher)).toEqual([1]);
    });
    expectErrorContaining(matcher, [1, 2, 3, 4], 'over the maximum length');
    expectErrorContaining(matcher, ['1'], 'not a number');
  });
});
