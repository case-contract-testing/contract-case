import * as fs from 'node:fs';

import {
  willCallFunction,
  FunctionExecutorConfig,
  defineContract,
} from './index.js';

const contractDetails = {
  consumerName: 'function caller',
  providerName: 'function execution',
};

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
      ...contractDetails,
      contractFilename: FILENAME, // Usually you will not need to provide a filename
    },
    (contract) => {
      describe('function with no args', () => {
        it('returns nothing', () =>
          contract.runExample(
            {
              definition: willCallFunction({
                arguments: [],
                returnValue: null,
                functionName: 'zeroArgs',
              }),
            },
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable(),
              testResponse: (returnValue) => {
                expect(returnValue).toEqual(null);
              },
            },
          ));
      });
      describe('function with two args', () => {
        it('returns nothing', () =>
          contract.runExample(
            {
              definition: willCallFunction({
                arguments: ['example', 2],
                returnValue: 'example2',
                functionName: 'concatenate',
              }),
            },
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable('example', 2),
              testResponse: (returnValue: unknown) => {
                expect(returnValue).toEqual('example2');
              },
            },
          ));
      });
    },
  );
});
