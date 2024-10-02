import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { AnyCaseMatcher } from '@contract-case/case-entities-internal';
import { AnyLeafOrStructure } from '@contract-case/case-plugin-dsl-types';
import { anyNumber, anyString, namedMatch } from './boundaries/dsl/Matchers';

import { makeExpectErrorContaining } from './__tests__/expectErrorContaining';
import { MAINTAINER_TEST_CONTEXT } from './__tests__/testContext';
import { WritingCaseContract } from './core';
import { writerDependencies } from './connectors/dependencies';
import { defaultPrinter } from './__tests__/jest/defaultTestPrinter';

describe('named matches', () => {
  const contract = new WritingCaseContract(
    {
      consumerName: 'test lookup consumer',
      providerName: 'test lookup provider',
    },
    writerDependencies(defaultPrinter),
    MAINTAINER_TEST_CONTEXT,
    ['tests'],
  );

  const expectErrorContaining = makeExpectErrorContaining(contract);

  describe("named matcher that isn't defined yet", () => {
    const matcher = {
      a: namedMatch('some string'),
    };
    it('fails', async () => {
      await expect(
        contract.checkMatch(matcher, {
          a: 'other string',
        }),
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
        }),
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
        }),
      ).toStrictEqual([]);
    });
    expectErrorContaining(
      matcher,
      { a: 'some string', b: 'other string' },
      'is not a number',
    );
    expectErrorContaining(
      matcher,
      { a: 1, b: 'other string' },
      'is not a number',
    );
    it('strips to the expected example', () => {
      expect(contract.stripMatchers(matcher)).toEqual({ a: 1, b: 1 });
    });
  });

  describe('object matcher with named matchers introduced earlier', () => {
    const repeatTests = (matcher: AnyLeafOrStructure | AnyCaseMatcher) => {
      it('accepts a matching object with different values', async () => {
        expect(
          await contract.checkMatch(matcher, {
            a: '1',
            b: 2,
          }),
        ).toStrictEqual([]);
      });
      expectErrorContaining(
        matcher,
        { a: 'some string', b: 'other string' },
        'is not a number',
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a string',
      );
      expectErrorContaining(
        matcher,
        { a: 1, b: 'other string' },
        'is not a number',
      );
      expectErrorContaining(
        matcher,
        { a: '1', b: 'other string' },
        'is not a number',
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
        }),
      );
    });
    describe('when named without content', () => {
      repeatTests(namedMatch('object example'));
    });
  });
});
