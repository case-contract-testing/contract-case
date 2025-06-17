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
          .addTriggerGroup('An invocation of NO ARG FUNCTION()', {
            trigger: async (setup: FunctionExecutorConfig) =>
              setup.getFunction(setup.mock.functionHandle)(),
            testResponses: {
              'returning null': (returnValue) => expect(returnValue).toBe(null),
            },
          })
          .addTriggerGroup(
            'An invocation of HAS ARGS FUNCTION( "example", 2 )',
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)('example', 2),
              testResponses: {
                'returning "example2"': (returnValue) =>
                  expect(returnValue).toEqual('example2'),
              },
            },
          ),
      }),
  );
});
