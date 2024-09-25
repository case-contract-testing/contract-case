import { verifyContract } from './boundaries/jest/jest.js';

describe('verification', () => {
  verifyContract(
    {
      providerName: 'function execution',
    },
    (verifier) => {
      verifier.registerFunction('zeroArgs', () => {});
      verifier.registerFunction('concatenate', (a, b) => `${a}${b}`);
      return verifier.runVerification();
    },
  );
});
