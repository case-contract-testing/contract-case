import { CaseConfig, ContractFileFromDisk } from '../../../core/types';

export interface ContractVerificationTestHandle {
  testName: string;
  testIndex: number;
  contractIndex: number;
}

export type VerifiableContract = {
  contract: ContractFileFromDisk;
  config: CaseConfig;
};
