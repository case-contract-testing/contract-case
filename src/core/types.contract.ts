import { ContractData, DataContext } from '../entities/types';

export type WriteContract = (
  contract: ContractData,
  context: DataContext
) => string;
