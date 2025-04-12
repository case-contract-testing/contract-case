import { DataContext } from '@contract-case/case-plugin-base';
import { ContractData } from '../entities/types';

export type WriteContract = (
  contract: ContractData,
  context: DataContext,
) => string;
