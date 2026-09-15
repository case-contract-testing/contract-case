import { describe, it, expect } from 'vitest';

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
