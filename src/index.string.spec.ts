import { stringContaining } from 'boundaries/dsl/Matchers';
import { CaseContract } from 'connectors/contract';
import { DEFAULT_CONFIG } from 'connectors/contract/core';

import { makeNoErrorResult } from 'entities/results';
import { makeExpectErrorContaining } from '__tests__/expectErrorContaining';

describe('and matchers', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test string consumer',
      providerName: 'test string provider',
    },
    DEFAULT_CONFIG
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe('And matcher', () => {
    const matcher = stringContaining('foo', 'foofoo');

    it('matches an exact string', async () => {
      await expect(contract.checkMatch(matcher, 'foo')).resolves.toEqual(
        makeNoErrorResult()
      );
    });
    it('matches at the start of the string', async () => {
      await expect(contract.checkMatch(matcher, 'foobar')).resolves.toEqual(
        makeNoErrorResult()
      );
    });

    it('matches at the end of the string', async () => {
      await expect(contract.checkMatch(matcher, 'barfoo')).resolves.toEqual(
        makeNoErrorResult()
      );
    });

    it('matches in the middle of the string', async () => {
      await expect(contract.checkMatch(matcher, 'barfoobar')).resolves.toEqual(
        makeNoErrorResult()
      );
    });
    it('can strip matchers', () => {
      expect(contract.stripMatchers(matcher)).toEqual('foofoo');
    });
    expectErrorContaining(matcher, [1, 2, 3, 4], 'not a string');
    expectErrorContaining(matcher, ['foo'], 'not a string');
    expectErrorContaining(
      matcher,
      'barbaroof',
      "did not include the expected substring 'foo'"
    );
  });
});
