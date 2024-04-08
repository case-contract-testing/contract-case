import { verifyContract } from '.';

// This file exists for debugging purposes - rename it to `spec.ts` to run

verifyContract(
  {
    providerName: 'http request provider',
    printResults: false,
    logLevel: 'maintainerDebug',
  },
  (verifier) => verifier.runVerification({}),
);
