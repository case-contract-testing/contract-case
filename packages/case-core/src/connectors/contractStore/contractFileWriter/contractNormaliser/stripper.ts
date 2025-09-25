import { DownloadedContract } from '../../../../core/types.broker';
import { ContractData, ContractMetadata } from '../../../../entities/types';

/**
 * Strips the fields that the broker adds to contracts.
 *
 * Used to remove the details about how to update a contract from the
 * actual contract for comparison.
 *
 * @param contract - either a DownloadedContract or a ContractData
 * @returns just the ContractData portion of the contract
 */
export const stripDownloadedFields = (
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
export const emptyMetaData = (contract: ContractData): ContractData => ({
  ...contract,
  metadata: {} as ContractMetadata,
});
