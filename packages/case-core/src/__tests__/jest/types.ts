import type { MultiTestInvoker } from '../../core/executeExample/types';
import type { CaseConfig } from '../../core/types';
import type {
  AnyMockDescriptorType,
  CaseContractDescription,
} from '../../entities/types';
import { ContractDefiner } from '../../boundaries/ContractDefiner';
import { ContractVerifier } from '../../boundaries/ContractVerifier';

export type CaseJestConfig<T extends AnyMockDescriptorType> =
  CaseContractDescription & {
    config?: CaseConfig & MultiTestInvoker<T>;
  };

export type DefineCaseJestCallback = <T extends AnyMockDescriptorType>(
  contract: ContractDefiner<T>
) => void;

export type VerifyCaseJestCallback = (contract: ContractVerifier) => void;
