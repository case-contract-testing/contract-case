import { AnyMockDescriptorType } from '@contract-case/case-entities-internal';
import { CaseContractDescription } from '@contract-case/case-plugin-base/case-core/src/entities/contract/types';
import {
  ContractDefinerConnector,
  ContractVerifierConnector,
} from '../../connectors';
import type { MultiTestInvoker } from '../../core/executeExample/types';
import type { CaseConfig } from '../../core/types';

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
