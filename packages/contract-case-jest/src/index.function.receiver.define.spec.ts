/* eslint-disable jest/expect-expect */
import * as fs from 'node:fs';

import {
  ContractCaseDefiner,
  ContractCaseJestConfig,
  DefineCaseJestCallback,
  willReceiveFunctionCall,
} from './index.js';

const contractDetails = {
  consumerName: 'function caller',
  providerName: 'function execution',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/temp-function-receiver.case.json`;

const TIMEOUT = 3000;

/**
 * This is a copy of defineContract that doesn't do teardown - so that internal tests can fail.
 */
const defineInternalContract = (
  config: ContractCaseJestConfig,
  callback: DefineCaseJestCallback,
): void =>
  describe(`Case contract definition`, () => {
    const contract = new ContractCaseDefiner({
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      ...config,
    });

    describe(`between ${config.consumerName} and ${config.providerName}`, () => {
      jest.setTimeout(TIMEOUT);

      callback(contract);
    });
  });

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
      printResults: true, // Set this to true for you own tests
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
        describe('without the mockConfig property', () => {
          it('fails', () =>
            expect(
              contract.runExample({
                definition: willReceiveFunctionCall({
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
                  definition: willReceiveFunctionCall({
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
                definition: willReceiveFunctionCall({
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
                definition: willReceiveFunctionCall({
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
              definition: willReceiveFunctionCall({
                arguments: [],
                returnValue: null,
              }),
            },
            { mockConfig: { function: { handle: NO_ARG_FUNCTION_HANDLE } } },
          ));
      });
    },
  );
});
