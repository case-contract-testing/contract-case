import { DataContext } from '@contract-case/case-plugin-base';
import { ContractData } from '../entities/types';

export type WriteContract = (
  contract: ContractData,
  context: DataContext,
) => WrittenContractFileDetails;

export interface WrittenContractFileDetails {
  /* The paths to the contracts written, relative to the current working directory */
  contractPaths: Array<string>;
  /* The consumer slug (ie, the consumer part of the filename), normalised
   * however ContractCase chose to normalise it */
  consumerSlug: string;
  /* The provider slug (ie, the provider part of the filepath), normalised
   * however ContractCase chose to normalise it */
  providerSlug: string;
}
