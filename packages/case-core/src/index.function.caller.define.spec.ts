import * as fs from 'node:fs';
import { mocks } from '@contract-case/case-definition-dsl';
import { defineInternalContract } from './__tests__/jest/jest';
import { anyInteger, anyString } from './boundaries';

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
        it('returns nothing', () =>
          contract.runExample({
            definition: new mocks.functions.WillCallFunction({
              arguments: [],
              returnValue: null,
              functionName: 'noArgs',
            }),
            trigger: async (config: any) => config.invokeable(),
            testResponse: (result) => {
              expect(result).toEqual(null);
            },
          }));
      });

      it('fails with wrong number of args', () =>
        expect(
          contract.runExample({
            definition: new mocks.functions.WillCallFunction({
              arguments: [anyInteger(3)],
              returnValue: null,
              functionName: 'oneArg',
            }),
            trigger: async (config: any) => config.invokeable(1, 2),
            testResponse: (result) => {
              expect(result).toEqual(null);
            },
          }),
        ).rejects.toThrow(
          'The function expected 1 argument, but received 2 arguments',
        ));
      it('fails with wrong data in args', () =>
        expect(
          contract.runExample({
            definition: new mocks.functions.WillCallFunction({
              arguments: [anyInteger(3), anyString('2')],
              returnValue: null,
              functionName: 'twoArgs',
            }),
            trigger: async (config: any) => config.invokeable(1, 2),
            testResponse: (result) => {
              expect(result).toEqual(null);
            },
          }),
        ).rejects.toThrow("The function arguments didn't match"));
    },
  );
});
