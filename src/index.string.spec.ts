import {
  anyString,
  stringContaining,
  stringPrefix,
  stringSuffix,
} from './boundaries/dsl/Matchers';
import { CaseContract } from './connectors/contract';

import { makeNoErrorResult } from './entities/results';
import {
  MAINTAINER_TEST_CONTEXT,
  makeExpectErrorContaining,
} from './__tests__/expectErrorContaining';

describe('string matchers', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test string consumer',
      providerName: 'test string provider',
    },
    MAINTAINER_TEST_CONTEXT
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe('String containing matcher', () => {
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

  describe('String prefix matcher', () => {
    describe('with an empty suffix', () => {
      const matcher = stringPrefix('foo', '');

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'foo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(
        matcher,
        'barfoo',
        "did not start with the expected prefix 'foo'"
      );
      expectErrorContaining(matcher, 'foobar', 'not exactly equal to ""');
    });

    describe('with any suffix', () => {
      const matcher = stringPrefix('foo', anyString());

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'foo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      it('matches a string with extra at the end', async () => {
        await expect(contract.checkMatch(matcher, 'foobar')).resolves.toEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(
        matcher,
        'barfoo',
        "did not start with the expected prefix 'foo'"
      );
    });

    describe('nested', () => {
      const matcher = stringPrefix('foo', stringPrefix('bar', anyString()));

      expectErrorContaining(
        matcher,
        'bar',
        "did not start with the expected prefix 'foo'"
      );

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'foobar')).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      expectErrorContaining(
        matcher,
        'foobaz',
        "did not start with the expected prefix 'bar'"
      );
      it('matches a string with extra at the end', async () => {
        await expect(
          contract.checkMatch(matcher, 'foobarbaz')
        ).resolves.toEqual(makeNoErrorResult());
      });
    });
  });

  describe('String suffix matcher', () => {
    describe('with an empty prefix', () => {
      const matcher = stringSuffix('', 'foo');

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'foo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(
        matcher,
        'foobar',
        "did not end with the expected suffix 'foo'"
      );
      expectErrorContaining(matcher, 'barfoo', 'not exactly equal to ""');
    });

    describe('with any suffix', () => {
      const matcher = stringSuffix(anyString(), 'foo');

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'foo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      it('matches a string with extra at the start', async () => {
        await expect(contract.checkMatch(matcher, 'barfoo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });
      expectErrorContaining(
        matcher,
        'foobar',
        "did not end with the expected suffix 'foo'"
      );
    });

    describe('nested', () => {
      const matcher = stringSuffix(stringSuffix(anyString(), 'bar'), 'foo');

      expectErrorContaining(
        matcher,
        'bar',
        "did not end with the expected suffix 'foo'"
      );

      it('matches an exact string', async () => {
        await expect(contract.checkMatch(matcher, 'barfoo')).resolves.toEqual(
          makeNoErrorResult()
        );
      });

      expectErrorContaining(
        matcher,
        'foobazfoo',
        "did not end with the expected suffix 'bar'"
      );
      it('matches a string with extra at the end', async () => {
        await expect(
          contract.checkMatch(matcher, 'bazbarfoo')
        ).resolves.toEqual(makeNoErrorResult());
      });
    });
  });
});
