import type { ContractDefiner } from '../../connectors/contract/ContractDefiner';
import type { ContractVerifier } from '../../connectors/contract/ContractVerifier';
import type { MultiTestInvoker } from '../../core/contract/executeExample/types';
import type { CaseConfig } from '../../core/types';
import type {
  AnyMockDescriptorType,
  ContractDescription,
} from '../../entities/types';

export type CaseJestConfig<T extends AnyMockDescriptorType> =
  ContractDescription & {
    config?: CaseConfig & MultiTestInvoker<T>;
  };

export type DefineCaseJestCallback = <T extends AnyMockDescriptorType>(
  contract: ContractDefiner<T>
) => void;

export type VerifiyCaseJestCallback = (contract: ContractVerifier) => void;
