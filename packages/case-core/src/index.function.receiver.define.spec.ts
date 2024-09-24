/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';
import { mocks } from '@contract-case/case-definition-dsl';
import { defineInternalContract } from './__tests__/jest/jest';
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
  defineInternalContract(
    {
      ...contractDetails,
      config: {
        printResults: false, // Set this to true for you own tests
        contractFilename: FILENAME, // Usually you will not need to provide a filename
      },
    },
    (contract) => {
      describe('function with no args', () => {
        // This string can be anything you like, as long as it's the same when
        // registering the function, and executing the test
        const NO_ARG_FUNCTION_HANDLE = 'NO ARG FUNCTION';
        beforeAll(() => {
          contract.registerFunction(NO_ARG_FUNCTION_HANDLE, async () => null);
        });
        describe('without the mockConfig property', () => {
          it('fails', () =>
            expect(
              contract.runExample({
                definition: new mocks.functions.WillReceiveFunctionCall({
                  arguments: [],
                  returnValue: null,
                }),
              }),
            ).rejects.toThrow(
              "The plugin 'function execution plugin' requires the mockConfig configuration property to be set with a key of 'function'",
            ));
        });
        describe('with the mockConfig property', () => {
          it("fails without the 'function' key", () =>
            expect(
              contract.runExample(
                {
                  definition: new mocks.functions.WillReceiveFunctionCall({
                    arguments: [],
                    returnValue: null,
                  }),
                },
                { mockConfig: {} },
              ),
            ).rejects.toThrow(
              /The plugin 'function execution plugin' requires the mockConfig configuration property/,
            ));
        });
        it('fails without the handle property', () =>
          expect(
            contract.runExample(
              {
                definition: new mocks.functions.WillReceiveFunctionCall({
                  arguments: [],
                  returnValue: null,
                }),
              },
              { mockConfig: { function: {} } },
            ),
          ).rejects.toThrow(
            /Must specify a value for 'handle' in mockConfig\['function'\]/,
          ));
        it('fails without the right handle property', () =>
          expect(
            contract.runExample(
              {
                definition: new mocks.functions.WillReceiveFunctionCall({
                  arguments: [],
                  returnValue: null,
                }),
              },
              { mockConfig: { function: { handle: 'This one is wrong' } } },
            ),
          ).rejects.toThrow(
            /Tried to invoke a user-provided function with the handle 'This one is wrong'/,
          ));

        it('succeeds with correct config', () =>
          contract.runExample(
            {
              definition: new mocks.functions.WillReceiveFunctionCall({
                arguments: [],
                returnValue: null,
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
          contract.registerFunction(FUNCTION_WITH_ARG_HANDLE, ((
            s: string,
            n: number,
          ) => Promise.resolve(`${s}${n}`)) as (
            ...args: any[]
          ) => Promise<any>);
        });

        it('succeeds with correct config', () =>
          contract.runExample(
            {
              definition: new mocks.functions.WillReceiveFunctionCall({
                arguments: [anyString('example'), anyNumber(2)],
                returnValue: anyString('example2'),
              }),
            },
            { mockConfig: { function: { handle: FUNCTION_WITH_ARG_HANDLE } } },
          ));
      });
    },
  );
});
