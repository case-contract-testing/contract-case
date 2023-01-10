import { CaseContract } from 'boundaries';
import { objectEachValueMatches } from 'boundaries/dsl/Matchers';
import { DEFAULT_CONFIG } from 'connectors/contract/core';
import { makeNoErrorResult } from 'entities/results';
import { makeExpectErrorContaining } from '__tests__/expectErrorContaining';

describe('basic types and structure checks', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test object consumer',
      providerName: 'test object provider',
    },
    DEFAULT_CONFIG
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

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
