/* eslint-disable jest/no-export */
import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import type { CaseConfig } from '../../core/types';
import type {
  CaseJestConfig,
  DefineCaseJestCallback,
  VerifyCaseJestCallback,
} from './types';

import {
  ContractDefinerConnector,
  ContractVerifierConnector,
} from '../../connectors';
import { defaultPrinter } from './defaultTestPrinter';

const TIMEOUT = 30000;

export const defineContract = <T extends AnyMockDescriptorType>(
  { config, ...contractConfig }: CaseJestConfig<T>,
  callback: DefineCaseJestCallback,
): void =>
  describe(`ContractCase contract definition`, () => {
    const { stateHandlers, triggers, ...contextConfig } = config || {};

    const contract = new ContractDefinerConnector(
      contractConfig,
      {
        testRunId:
          process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
        ...contextConfig,
      },
      { stateHandlers, triggers },
      defaultPrinter,
      ['local-jest-wrapper'],
    );

    afterAll(() => contract.endRecord(), TIMEOUT);

    describe(`between ${contractConfig.consumerName} and ${contractConfig.providerName}`, () => {
      jest.setTimeout(30000);

      callback(contract);
    });
  });

/**
 * This is a copy of defineContract that doesn't do teardown - so that internal tests can fail.
 */
export const defineContractNoTeardown = <T extends AnyMockDescriptorType>(
  { config, ...contractConfig }: CaseJestConfig<T>,
  callback: DefineCaseJestCallback,
): void =>
  describe(`Case internal contract definition`, () => {
    const { stateHandlers, triggers, ...contextConfig } = config || {};
    const contract = new ContractDefinerConnector(
      contractConfig,
      {
        testRunId:
          process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
        ...contextConfig,
      },
      { stateHandlers, triggers },
      defaultPrinter,
      ['local-jest-wrapper'],
    );

    describe(`between ${contractConfig.consumerName} and ${contractConfig.providerName}`, () => {
      jest.setTimeout(TIMEOUT);

      callback(contract);
    });
  });

export const verifyContract = (
  config: CaseConfig,
  callback: VerifyCaseJestCallback,
): void => {
  if (!config.providerName) {
    throw new Error('Must specify a providerName to verify');
  }
  describe(`Provider verification for ${config.providerName}`, () => {
    callback(
      new ContractVerifierConnector(
        {
          ...config,
          internals: {
            asyncVerification: false,
          },
        },
        defaultPrinter,
        ['local-jest-wrapper'],
      ),
    );
  });
};
