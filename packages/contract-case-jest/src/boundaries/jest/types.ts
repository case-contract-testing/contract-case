import type {
  ContractCaseDefiner,
  ContractVerifier,
  ContractCaseConfig,
  ContractCaseVerifierConfig,
} from '@contract-case/contract-case-connector-js';

export type ContractCaseJestConfig = ContractCaseConfig;
export type ContractCaseJestVerifierConfig = ContractCaseVerifierConfig;

export type DefineCaseJestCallback = (contract: ContractCaseDefiner) => void;

export type VerifyCaseJestCallback = (contract: ContractVerifier) => void;
