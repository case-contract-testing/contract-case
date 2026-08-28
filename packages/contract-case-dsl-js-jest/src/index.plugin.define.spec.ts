import {
  willCallFunction,
  FunctionExecutorConfig,
  defineContract,
} from './index.js';

// This matcher is provided by the fixture plugin (which lives in
// case-connector/test-fixtures). It accepts any actual value, and strips to
// the example 'stripped-by-default-export'.
const fixturePluginMatcher = {
  '_case:matcher:type': 'test-fixture:default-export:Matcher',
};

describe('definition with a loaded plugin', () => {
  defineContract(
    {
      consumerName: 'plugin fixture consumer',
      providerName: 'plugin fixture provider',
      changedContracts: 'OVERWRITE',
    },
    (contract) => {
      beforeAll(() =>
        contract.loadPlugins('@contract-case/test-plugin-fixture'),
      );

      describe('an interaction that uses a plugin-provided matcher', () => {
        it('strips and matches with the plugin matcher', () =>
          contract.runInteraction(
            {
              definition: willCallFunction({
                arguments: [],
                returnValue: fixturePluginMatcher,
                functionName: 'returnsPluginMatchedValue',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testResponse: (returnValue) => {
                expect(returnValue).toEqual('stripped-by-default-export');
              },
            },
          ));
      });
    },
  );
});
