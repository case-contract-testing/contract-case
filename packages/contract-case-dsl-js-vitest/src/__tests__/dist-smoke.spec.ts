import { describe, it, expect } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  defineContract,
  verifyContract,
} from '@contract-case/contract-case-vitest';

describe('built package entry point', () => {
  it('exports the vitest DSL', () => {
    expect(typeof defineContract).toBe('function');
    expect(typeof verifyContract).toBe('function');
  });
});
