import { verifyContract } from './boundaries/jest/jest.js';

import { CustomError } from './__tests__/fixtures/CustomError.js';
import { ErrorWithPayload } from './__tests__/fixtures/ErrorWithPayload.js';

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
      verifier.registerFunction('throwsErrorWithPayload', () => {
        throw new ErrorWithPayload(
          'The message is ignored',
          456,
          'but the payload shape is checked',
        );
      });
    },
  );
});
