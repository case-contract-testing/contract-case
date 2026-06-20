import { describe } from 'vitest';

import { verifyContract } from './boundaries/vitest/vitest.js';

describe('verification', () => {
  verifyContract(
    {
      providerName: 'function execution',
      throwOnFail: true,
    },
    (verifier) => {
      verifier.registerFunction('zeroArgs', () => {});
      verifier.registerFunction('concatenate', (a, b) => `${a}${b}`);
    },
  );
});
