/* eslint-disable jest/expect-expect */
import { ContractData } from '../../../../../entities/types';
import { consumerSlug, providerSlug } from './slugs';

const consumerContract = (consumerName: string): ContractData => ({
  contractType: 'case::contract',
  description: {
    consumerName,
    providerName: 'someProvider',
  },
  metadata: { _case: {} },
  matcherLookup: {},
  examples: [],
});

const providerContract = (providerName: string): ContractData => ({
  contractType: 'case::contract',
  description: {
    consumerName: 'someConsumer',
    providerName,
  },
  metadata: { _case: {} },
  matcherLookup: {},
  examples: [],
});

describe('slug functions', () => {
  const expectConversion = (from: string, to: string) => {
    expect(consumerSlug(consumerContract(from))).toBe(to);
    expect(providerSlug(providerContract(from))).toBe(to);
  };
  it('works on boring words', () => {
    expectConversion('apple', 'apple');
  });

  it('preserves underscores', () => {
    expectConversion('apple', 'apple');
  });

  it('replaces spaces', () => {
    expectConversion('one two', 'one-two');
  });
});
