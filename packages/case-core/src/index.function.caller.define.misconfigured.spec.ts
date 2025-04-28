/* eslint-disable @typescript-eslint/dot-notation */
import { interactions } from '@contract-case/case-definition-dsl';
import { BaseSetupInfo } from '@contract-case/case-plugin-dsl-types';
import { defineContractNoTeardown } from './__tests__/jest/jest';
import { anyInteger, anyString } from './boundaries';

const contractDetails = {
  consumerName: 'function caller',
  providerName: 'function execution',
};

// Normally you can just let Case set a filename for you.
const FILENAME = `case-contracts/temp-function-caller.case.json`;

describe('function executor', () => {
  defineContractNoTeardown(
    {
      ...contractDetails,
      config: {
        // These tests are expected to be failing, so we don't want to print anything
        printResults: false,
        // Similarly, we don't want to log anything
        logLevel: 'none',
        contractFilename: FILENAME,
      },
    },
    (contract) => {
      describe('function with no args', () => {
        it('returns nothing', () =>
          contract.runInteraction({
            definition: new interactions.functions.WillCallFunction({
              arguments: [],
              returnValue: null,
              functionName: 'noArgs',
            }),
            trigger: async (setup: BaseSetupInfo) =>
              setup.functions[setup.mock['functionHandle']]?.(),
            testResponse: (result) => {
              expect(result).toEqual('null');
            },
          }));
      });

      it('fails with wrong number of args', () =>
        expect(
          contract.runInteraction({
            definition: new interactions.functions.WillCallFunction({
              arguments: [anyInteger(3)],
              returnValue: null,
              functionName: 'oneArg',
            }),
            trigger: async (setup: BaseSetupInfo) =>
              setup.functions['oneArg']?.('1', '2'),
            testResponse: (result) => {
              expect(result).toEqual('null');
            },
          }),
        ).rejects.toThrow(
          'The function expected 1 argument, but received 2 arguments',
        ));
      it('fails with wrong data in args', () =>
        expect(
          contract.runInteraction({
            definition: new interactions.functions.WillCallFunction({
              arguments: [anyInteger(3), anyString('2')],
              returnValue: null,
              functionName: 'twoArgs',
            }),
            trigger: async (setup: any) => setup.functions['twoArgs']('1', '2'),
            testResponse: (result) => {
              expect(result).toEqual('null');
            },
          }),
        ).rejects.toThrow("The function arguments didn't match"));
    },
  );
});
