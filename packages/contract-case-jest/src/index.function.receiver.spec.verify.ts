import { verifyContract } from './boundaries/jest/jest.js';
import { TriggerGroupMap } from './connectors/TriggerGroup.js';
import { FunctionExecutorConfig } from './index.js';

describe('verification', () => {
  verifyContract(
    {
      providerName: 'function definer',
      printResults: true, // Remove this / set to true if you are copying this example
    },
    (verifier) =>
      verifier.runVerification({
        mockConfig: { function: { handle: 'soo' } },
        triggers: new TriggerGroupMap()
          .addTriggerGroup('a function invoked with no arguments', {
            trigger: async (config: FunctionExecutorConfig) =>
              config.invokeable(),
            testResponses: {
              null: (returnValue) => expect(returnValue).toBe(null),
            },
          })
          .addTriggerGroup(
            'a function invoked with 2 arguments ( "example", 2 )',
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable('example', 2),
              testResponses: {
                '"example2"': (returnValue) =>
                  expect(returnValue).toEqual('example2'),
              },
            },
          ),
      }),
  );
});
