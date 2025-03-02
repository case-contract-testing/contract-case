import * as fs from 'node:fs';

import {
  willCallFunction,
  FunctionExecutorConfig,
  defineContract,
} from './index.js';

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/temp-function-caller.case.json`;

describe('function executor', () => {
  beforeAll(() => {
    // Delete the contract file first
    try {
      fs.rmSync(FILENAME);
      fs.mkdirSync('case-contracts');
    } catch (e) {
      // We don't care if this fails
    }
  }, 30000);
  defineContract(
    {
      consumerName: 'function caller',
      providerName: 'function execution',
      contractFilename: FILENAME, // Usually you will not need to provide a filename
    },
    (contract) => {
      describe('function with no args', () => {
        it('returns nothing', () =>
          contract.runInteraction(
            {
              definition: willCallFunction({
                arguments: [],
                returnValue: null,
                functionName: 'zeroArgs',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)(),
              testResponse: (returnValue) => {
                expect(returnValue).toEqual(null);
              },
            },
          ));
      });
      describe('function with two args', () => {
        it('returns nothing', () =>
          contract.runInteraction(
            {
              definition: willCallFunction({
                arguments: ['example', 2],
                returnValue: 'example2',
                functionName: 'concatenate',
              }),
            },
            {
              trigger: async (setup: FunctionExecutorConfig) =>
                setup.getFunction(setup.mock.functionHandle)('example', 2),
              testResponse: (returnValue: unknown) => {
                expect(returnValue).toEqual('example2');
              },
            },
          ));
      });
    },
  );
});
