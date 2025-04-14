import { DownloadedContract } from '../../../core/types.broker';
import { ContractData } from '../../../entities/types';

/**
 * Strips any state-provided values from the contract.
 *
 * This is important because these are provided by the (possibly non-hermetic)
 * state handlers present in some interaction types (eg, contracts defined by
 * http response consumers). The state-provided variables are part of the test
 * configuration, and not part of the contract.
 *
 * Note this doesn't strip state variable default values, only those from state
 * handlers.
 *
 * @param contract - the contract to strip variables from
 * @returns the contract without the state-provided variables
 */
const stripStateVariables = (contract: ContractData): ContractData => ({
  ...contract,
  matcherLookup: Object.entries(contract.matcherLookup)
    .filter(([key]) => !key.startsWith('variable:state'))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
});

/**
 * Strips the fields that the broker adds to contracts.
 *
 * Used to remove the details about how to update a contract from the
 * actual contract for comparison.
 *
 * @param contract - either a DownloadedContract or a ContractData
 * @returns just the ContractData portion of the contract
 */
const stripDownloadedFields = (
  contract: DownloadedContract | ContractData,
): ContractData => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _links, createdAt, ...rest } = contract as DownloadedContract;
  return rest;
};

/**
 * Returns a copy of a ContractData object without the metadata.
 *
 * Useful for comparing contracts.
 *
 * @param contract - the contract to remove metadata from
 * @returns a copy of the contract with an empty metadata section
 */
const emptyMetaData = (contract: ContractData): ContractData => ({
  ...contract,
  metadata: {},
});

/**
 * Strips everything that might vary from run to run in a contract, to enable
 * comparison of whether the actual expectations have changed, and to enable
 * hashing based purely on the expectations.
 *
 * @param contract -
 * @returns
 */
export const stripForComparison = (
  contract: DownloadedContract | ContractData,
): ContractData =>
  stripDownloadedFields(emptyMetaData(stripStateVariables(contract)));

/**
 * Strips anything that is in the contract file during definition but shouldn't
 * be in a serialised contract file.
 *
 * @param contract - A full contract data object
 * @returns A contract data object suitable for writing to disk
 */
export const stripForWriting = (contract: ContractData): ContractData =>
  stripStateVariables(contract);
