import { verifyContract } from './boundaries/jest/jest.js';

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
