import {
  objectEachKeyMatches,
  objectEachValueMatches,
  stringContaining,
} from './boundaries/dsl/Matchers';

import { makeNoErrorResult } from './entities/results';
import { makeExpectErrorContaining } from './__tests__/expectErrorContaining';
import { MAINTAINER_TEST_CONTEXT } from './__tests__/testContext';
import { WritingCaseContract } from './core';
import { writerDependencies } from './connectors/dependencies';
import { defaultPrinter } from './boundaries/console';

describe('basic types and structure checks', () => {
  const contract = new WritingCaseContract(
    {
      consumerName: 'test object consumer',
      providerName: 'test object provider',
    },
    writerDependencies(defaultPrinter),
    MAINTAINER_TEST_CONTEXT
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

    it('strips to the expected example', () => {
      expect(contract.stripMatchers(matcher)).toEqual({
        someKey: 'exact string',
      });
    });
  });

  describe('object each key', () => {
    describe('with an exact match', () => {
      const matcher = objectEachKeyMatches('exactString');
      it('accepts an object with one value', async () => {
        expect(
          await contract.checkMatch(matcher, { exactString: 'whatever' })
        ).toStrictEqual(makeNoErrorResult());
      });

      expectErrorContaining(matcher, {}, 'at least one key property');
      expectErrorContaining(
        matcher,
        { otherString: 'whatever' },
        'is not exactly equal'
      );
      expectErrorContaining(
        matcher,
        {
          exactString: 'exact string',
          someOtherKey: 'exact string',
        },
        'is not exactly equal'
      );

      it('strips to the expected example', () => {
        expect(contract.stripMatchers(matcher)).toEqual({
          exactString: 'someValue',
        });
      });
    });
    describe('with a vague match', () => {
      const matcher = objectEachKeyMatches(stringContaining('::', 'foo::'));
      it('accepts an object with one value', async () => {
        expect(
          await contract.checkMatch(matcher, {
            '::': 'whatever',
          })
        ).toStrictEqual(makeNoErrorResult());
      });

      it('accepts an object with multiple values', async () => {
        expect(
          await contract.checkMatch(matcher, {
            '::': 'whatever',
            'foo::': 'whatever',
            'foo::bar': 'something',
            '::foo': 'else',
          })
        ).toStrictEqual(makeNoErrorResult());
      });

      expectErrorContaining(matcher, {}, 'at least one key property');
      expectErrorContaining(
        matcher,
        { otherString: 'whatever' },
        "did not include the expected substring '::'"
      );
      expectErrorContaining(
        matcher,
        {
          '::': 'whatever',
          'foo::': 'whatever',
          'foo::bar': 'something',
          '::foo': 'else',
          sjsjs: 'oh no',
        },
        "did not include the expected substring '::'"
      );
      it('strips to the expected example', () => {
        expect(contract.stripMatchers(matcher)).toEqual({
          'foo::': 'someValue',
        });
      });
    });
  });
});
