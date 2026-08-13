import { verifyContract } from './boundaries/jest/jest.js';

describe('verification with a loaded plugin', () => {
  verifyContract(
    {
      providerName: 'plugin fixture provider',
      throwOnFail: true,
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
