import { verifyContract } from './boundaries/jest/jest.js';

describe('verification with a loaded plugin', () => {
  verifyContract(
    {
      providerName: 'plugin fixture provider',
      throwOnFail: true,
      // The plugin fixture contract isn't published to the broker (we're out
      // of PactFlow integrations), so it isn't in the downloaded temp-contracts
      // dir. Verify against the contract written locally by the define spec.
      contractDir: './case-contracts',
      publish: false,
    },
    (verifier) => {
      beforeAll(() =>
        verifier.loadPlugins('@contract-case/test-plugin-fixture'),
      );
      // The plugin's matcher accepts any value, so this function's return
      // value doesn't need to match the example recorded in the contract
      verifier.registerFunction(
        'returnsPluginMatchedValue',
        () => 'a different value to the example',
      );
    },
  );
});
