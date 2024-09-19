import * as fs from 'node:fs';

import {
  willCallFunction,
  FunctionExecutorConfig,
  anyInteger,
  ContractCaseDefiner,
  ContractCaseJestConfig,
  DefineCaseJestCallback,
  anyString,
} from './index.js';

const contractDetails = {
  consumerName: 'function caller',
  providerName: 'function execution',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/function-caller.case.json`;

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
  defineInternalContract(
    {
      ...contractDetails,
      printResults: true, // Set this to true for you own tests
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
              }),
            },
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable(),
              testResponse: (result) => {
                expect(result).toEqual(null);
              },
            },
          ));
      });

      it('fails with wrong number of args', () =>
        expect(
          contract.runExample(
            {
              definition: willCallFunction({
                arguments: [anyInteger(3)],
                returnValue: null,
              }),
            },
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable(1, 2),
              testResponse: (result) => {
                expect(result).toEqual(null);
              },
            },
          ),
        ).rejects.toThrow(
          'The function expected 1 argument, but received 2 arguments',
        ));
      it('fails with wrong data in args', () =>
        expect(
          contract.runExample(
            {
              definition: willCallFunction({
                arguments: [anyInteger(3), anyString('2')],
                returnValue: null,
              }),
            },
            {
              trigger: async (config: FunctionExecutorConfig) =>
                config.invokeable(1, 2),
              testResponse: (result) => {
                expect(result).toEqual(null);
              },
            },
          ),
        ).rejects.toThrow("The function arguments didn't match"));
    },
  );
});
