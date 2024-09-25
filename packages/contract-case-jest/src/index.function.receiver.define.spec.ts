/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';
import { defineContract, willReceiveFunctionCall } from './index.js';

const contractDetails = {
  consumerName: 'function execution',
  providerName: 'function definer',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/function-receiver.case.json`;

describe('function receiver', () => {
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
      logLevel: 'maintainerDebug',
    },
    (contract) => {
      describe('function with no args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const NO_ARG_FUNCTION_HANDLE = 'NO ARG FUNCTION';
        beforeAll(() => {
          contract.registerFunction(NO_ARG_FUNCTION_HANDLE, () => {});
        });

        it('succeeds', () =>
          contract.runExample(
            {
              definition: willReceiveFunctionCall({
                arguments: [],
                returnValue: null,
                functionName: NO_ARG_FUNCTION_HANDLE,
              }),
            },
            { mockConfig: { function: { handle: NO_ARG_FUNCTION_HANDLE } } },
          ));
      });
      describe('function with args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const FUNCTION_WITH_ARG_HANDLE = 'HAS ARGS FUNCTION';
        beforeAll(() => {
          contract.registerFunction(
            FUNCTION_WITH_ARG_HANDLE,
            (s: string, n: number) => `${s}${n}`,
          );
        });

        it('succeeds', () =>
          contract.runExample({
            definition: willReceiveFunctionCall({
              arguments: ['example', 2],
              returnValue: 'example2',
              functionName: FUNCTION_WITH_ARG_HANDLE,
            }),
          }));
      });
    },
  );
});
