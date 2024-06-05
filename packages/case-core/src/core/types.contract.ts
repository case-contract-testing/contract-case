import { DataContext } from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

export type WriteContract = (
  contract: ContractData,
  context: DataContext,
) => string;
