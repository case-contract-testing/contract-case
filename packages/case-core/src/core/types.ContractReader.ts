import { DataContext } from '@contract-case/case-plugin-base';
import { ContractFileFromDisk } from './types.broker';

export interface ContractStore {
  readContract: (pathToContract: string) => ContractFileFromDisk;
  readContractsFromDir: (pathToDir: string) => ContractFileFromDisk[];
}

export type MakeContractStore = (context: DataContext) => ContractStore;
