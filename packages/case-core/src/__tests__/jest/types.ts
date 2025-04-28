import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import {
  ContractDefinerConnector,
  ContractVerifierConnector,
} from '../../connectors';
import type { MultiTestInvoker } from '../../core/executeExample/types';
import type { CaseConfig } from '../../core/types';
import { CaseContractDescription } from '../../entities/types';

export type CaseJestConfig<T extends AnyMockDescriptorType> =
  CaseContractDescription & {
    config?: CaseConfig & MultiTestInvoker<T>;
  };

export type DefineCaseJestCallback = <T extends AnyMockDescriptorType>(
  contract: ContractDefinerConnector<T>,
) => void;

export type VerifyCaseJestCallback = (
  contract: ContractVerifierConnector,
) => void;
