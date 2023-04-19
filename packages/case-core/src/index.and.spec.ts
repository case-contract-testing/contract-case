import { and, arrayLength, shapedLike } from './boundaries/dsl/Matchers';

import { makeNoErrorResult } from './entities/results';
import { makeExpectErrorContaining } from './__tests__/expectErrorContaining';
import { MAINTAINER_TEST_CONTEXT } from './__tests__/testContext';
import { WritingCaseContract } from './core';
import { writerDependencies } from './connectors/dependencies';
import { defaultPrinter } from './boundaries/console';

describe('and matchers', () => {
  const contract = new WritingCaseContract(
    {
      consumerName: 'test and consumer',
      providerName: 'test and provider',
    },
    writerDependencies(defaultPrinter),
    MAINTAINER_TEST_CONTEXT
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

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
