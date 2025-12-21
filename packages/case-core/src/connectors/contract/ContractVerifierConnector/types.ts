import { CaseConfig, ContractFileFromDisk } from '../../../core/types';
import { CaseContractDescription } from '../../../entities/types';

type Metadata = Record<string, string | Record<string, string>> & {
  _case: Record<string, string>;
};

/**
 * Serialisable handle for a contract that is being verified.
 *
 */
export interface ContractVerificationHandle {
  contractIndex: number;
  filePath: string;
  metadata: Metadata;
  description: CaseContractDescription;
  testHandles: VerificationTestHandle[];
}

/**
 * Serialisable handle for a verification test, returned by prepareVerificationTests,
 * and can be used to invoke this specific test later.
 */
export interface VerificationTestHandle {
  testName: string;
  testIndex: number;
  contractIndex: number;
}

export type VerifiableContract = {
  contract: ContractFileFromDisk;
  config: CaseConfig;
};
