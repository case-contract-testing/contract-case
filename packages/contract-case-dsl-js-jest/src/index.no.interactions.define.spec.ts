import { ErrorCodes } from '@contract-case/case-plugin-base';

// These imports are from Case
import { ContractCaseDefiner } from './index.js';

describe('defining a contract with no interactions', () => {
  const makeDefiner = () =>
    new ContractCaseDefiner({
      testRunId:
        process.env['JEST_WORKER_ID'] || 'JEST_WORKER_ID_WAS_UNDEFINED',
      consumerName: 'empty contract consumer',
      providerName: 'empty contract provider',
    });

  it('fails to write the contract with a NO_INTERACTIONS_DEFINED error code', async () => {
    await expect(makeDefiner().endRecord()).rejects.toMatchObject({
      contractCaseErrorCode: ErrorCodes.configuration.NO_INTERACTIONS_DEFINED,
    });
  });

  it('fails with a ContractCaseConfigurationError', async () => {
    await expect(makeDefiner().endRecord()).rejects.toMatchObject({
      name: 'ContractCaseConfigurationError',
    });
  });
});
