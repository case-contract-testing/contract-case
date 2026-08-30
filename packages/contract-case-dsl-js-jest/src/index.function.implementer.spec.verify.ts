import { verifyContract } from './boundaries/jest/jest.js';
import {
  TriggerGroupMap,
  FunctionExecutorConfig,
  FunctionCompletedExceptionally,
} from './index.js';

describe('verification', () => {
  verifyContract({
    throwOnFail: true,
    providerName: 'function definer',
    triggers: new TriggerGroupMap()
      .addTriggerGroup('An invocation of NO ARG FUNCTION()', {
        trigger: async (setup: FunctionExecutorConfig) =>
          setup.getFunction(setup.mock.functionHandle)(),
        testResponses: {
          'returns null': (returnValue) => expect(returnValue).toBe(null),
          'returning null': (returnValue) => expect(returnValue).toBe(null),
        },
      })
      .addTriggerGroup('An invocation of HAS ARGS FUNCTION( "example", 2 )', {
        trigger: async (setup: FunctionExecutorConfig) =>
          setup.getFunction(setup.mock.functionHandle)('example', 2),
        testResponses: {
          'returning "example2"': (returnValue) =>
            expect(returnValue).toEqual('example2'),
          'returns "example2"': (returnValue) =>
            expect(returnValue).toEqual('example2'),
        },
      })
      .addTriggerGroup('An invocation of THROWING FUNCTION()', {
        trigger: async (setup: FunctionExecutorConfig) =>
          setup.getFunction(setup.mock.functionHandle)(),
        testErrorResponses: {
          'throwing a CustomError': (e) => {
            expect(e).toBeInstanceOf(FunctionCompletedExceptionally);
            expect((e as FunctionCompletedExceptionally).errorClassName).toBe(
              'CustomError',
            );
          },
        },
      })
      .addTriggerGroup('An invocation of THROWING FUNCTION WITH PAYLOAD()', {
        trigger: async (setup: FunctionExecutorConfig) =>
          setup.getFunction(setup.mock.functionHandle)(),
        testErrorResponses: {
          'throwing an ErrorWithPayload with a payload': (e) => {
            expect(e).toBeInstanceOf(FunctionCompletedExceptionally);
            const thrown = e as FunctionCompletedExceptionally;
            expect(thrown.errorClassName).toBe('ErrorWithPayload');
            expect(thrown.payload).toEqual({
              code: expect.any(Number),
              detail: expect.any(String),
            });
          },
        },
      }),
  });
});
