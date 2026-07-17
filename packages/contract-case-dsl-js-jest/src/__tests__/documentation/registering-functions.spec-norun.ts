import { verifyContract } from '../../boundaries/jest/jest.js';

describe('Function verification', () => {
  // example-extract _verify-register-functions
  verifyContract(
    {
      providerName: 'function execution',
    },
    (verifier) => {
      verifier.registerFunction('zeroArgs', () => {});
      verifier.registerFunction('concatenate', (a, b) => `${a}${b}`);
    },
  );
  // end-example
});
