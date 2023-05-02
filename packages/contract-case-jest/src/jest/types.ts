import { ContractCaseDefiner } from '../connectors/ContractDefiner';
import { ContractCaseConfig } from '../entities/config';

export type ContractCaseJestConfig = ContractCaseConfig & {
  consumerName: string;
  providerName: string;
};

export type DefineCaseJestCallback = (contract: ContractCaseDefiner) => void;

/*
export type VerifyCaseJestCallback = (contract: ContractVerifier) => void;
*/
