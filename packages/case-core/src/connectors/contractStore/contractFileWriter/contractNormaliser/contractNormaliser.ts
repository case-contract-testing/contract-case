import { HasContractFileConfig } from '@contract-case/case-plugin-base';
import { DownloadedContract } from '../../../../core/types.broker';
import { rawEquality } from '../../../../diffmatch';
import { ContractData } from '../../../../entities/types';
import { stripDownloadedFields, emptyMetaData } from './stripper';

const logContract = (
  name: string,
  contract: ContractData,
  context: HasContractFileConfig,
) => {
  context.logger.maintainerDebug(
    `${name} contract has ${contract.examples.length} interactions, ${Object.keys(contract.matcherLookup).length} lookups, and is between ${contract.description.consumerName} and ${contract.description.providerName}`,
  );
  return contract;
};

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

/**
 * Compares two contracts for equality, ignoring metadata and broker details.
 *
 * @param existingContract - a contract from disk
 * @param contract - the other contract to compare from
 * @returns True if the contracts are logically the same
 */
export const contractsEqual = (
  existingContract: DownloadedContract | ContractData,
  contract: ContractData,
  context: HasContractFileConfig,
): boolean =>
  rawEquality(
    logContract('Existing', stripForComparison(existingContract), context),
    logContract('New', stripForComparison(contract), context),
  );
