import { DataContext } from '../entities/types';
import { ContractFileFromDisk } from './types.broker';

export interface ContractStore {
  readContract: (pathToContract: string) => ContractFileFromDisk;
  readContractsFromDir: (pathToDir: string) => ContractFileFromDisk[];
}

export type MakeContractStore = (context: DataContext) => ContractStore;
