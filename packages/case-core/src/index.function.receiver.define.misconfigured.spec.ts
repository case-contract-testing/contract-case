/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';
import { interactions } from '@contract-case/case-definition-dsl';
import { defineContractNoTeardown } from './__tests__/jest/jest';
import { anyString, anyNumber } from './boundaries';

const contractDetails = {
  consumerName: 'function execution',
  providerName: 'function caller',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/temp-function-receiver.case.json`;

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
  defineContractNoTeardown(
    {
      ...contractDetails,
      config: {
        // These tests are expected to be failing, so we don't want to print anything
        printResults: false,
        // Similarly, we don't want to log anything
        logLevel: 'maintainerDebug',
        contractFilename: FILENAME, // Usually you will not need to provide a filename
      },
    },
    (contract) => {
      describe('function with no args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const NO_ARG_FUNCTION_HANDLE = 'NO ARG FUNCTION';
        beforeAll(() => {
          contract.registerFunction(NO_ARG_FUNCTION_HANDLE, async () => ({
            success: 'null',
          }));
        });
        describe('without the mockConfig property', () => {
          it('fails', () =>
            expect(
              contract.runInteraction({
                definition: new interactions.functions.WillReceiveFunctionCall({
                  arguments: [],
                  returnValue: null,
                  functionName: undefined as unknown as string, // hack to force it not to be set
                }),
              }),
            ).rejects.toThrow(
              /There was no functionName set to use as a handle to call this function./,
            ));
        });

        it('fails without the right handle property', () =>
          expect(
            contract.runInteraction({
              definition: new interactions.functions.WillReceiveFunctionCall({
                arguments: [],
                returnValue: null,
                functionName: 'This one is wrong',
              }),
            }),
          ).rejects.toThrow(
            /Tried to invoke a user-provided function with the handle 'This one is wrong'/,
          ));

        it('succeeds with correct config', () =>
          contract.runInteraction({
            definition: new interactions.functions.WillReceiveFunctionCall({
              arguments: [],
              returnValue: null,
              functionName: NO_ARG_FUNCTION_HANDLE,
            }),
          }));
      });
      describe('function with args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const FUNCTION_WITH_ARG_HANDLE = 'HAS ARGS FUNCTION';
        beforeAll(() => {
          contract.registerFunction(FUNCTION_WITH_ARG_HANDLE, ((
            s: string,
            n: number,
          ) => Promise.resolve({ success: `"${s}${n}"` })) as (
            ...args: any[]
          ) => Promise<any>);
        });

        it('succeeds with correct config', () =>
          contract.runInteraction({
            definition: new interactions.functions.WillReceiveFunctionCall({
              arguments: [anyString('example'), anyNumber(2)],
              returnValue: anyString('example2'),
              functionName: FUNCTION_WITH_ARG_HANDLE,
            }),
          }));
      });
    },
  );
});
