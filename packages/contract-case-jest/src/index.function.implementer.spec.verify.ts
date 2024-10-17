import { verifyContract } from './boundaries/jest/jest.js';
import { TriggerGroupMap } from './connectors/TriggerGroup.js';
import { FunctionExecutorConfig } from './index.js';

describe('verification', () => {
  verifyContract(
    {
      providerName: 'function definer',
    },
    (verifier) =>
      verifier.runVerification({
        triggers: new TriggerGroupMap()
          .addTriggerGroup('a function invoked with no arguments', {
            trigger: async (setup: FunctionExecutorConfig) =>
              setup.getFunction(setup.mock.functionHandle)(),
            testResponses: {
              null: (returnValue) => expect(returnValue).toBe(null),
            },
          })
          .addTriggerGroup(
            'a function invoked with 2 arguments ( "example", 2 )',
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)('example', 2),
              testResponses: {
                '"example2"': (returnValue) =>
                  expect(returnValue).toEqual('example2'),
              },
            },
          ),
      }),
  );
});
