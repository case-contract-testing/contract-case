import { verifyContract } from './boundaries/jest/jest.js';

import { CustomError } from './__tests__/fixtures/CustomError.js';
import { ErrorWithInternals } from './__tests__/fixtures/ErrorWithInternals.js';

describe('verification', () => {
  verifyContract(
    {
      providerName: 'function execution',
      throwOnFail: true,
    },
    (verifier) => {
      verifier.registerFunction('zeroArgs', () => {});
      verifier.registerFunction('concatenate', (a, b) => `${a}${b}`);
      verifier.registerFunction('throwsError', () => {
        throw new CustomError('The message is ignored');
      });
      verifier.registerFunction('throwsErrorWithInternals', () => {
        throw new ErrorWithInternals(
          'The message is ignored',
          456,
          'but the errorInternals shape is checked',
        );
      });
    },
  );
});
