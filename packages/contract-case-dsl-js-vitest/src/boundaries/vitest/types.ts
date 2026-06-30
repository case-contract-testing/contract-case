import type {
  ContractCaseDefiner,
  ContractVerifier,
  ContractCaseConfig,
  ContractCaseVerifierConfig,
} from '@contract-case/contract-case-dsl-js';

export type ContractCaseVitestConfig = ContractCaseConfig;
export type ContractCaseVitestVerifierConfig = ContractCaseVerifierConfig;

export type DefineCaseVitestCallback = (contract: ContractCaseDefiner) => void;

export type VerifyCaseVitestCallback = (contract: ContractVerifier) => void;
