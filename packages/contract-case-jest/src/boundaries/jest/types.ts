import { ContractCaseDefiner } from '../../connectors/ContractDefiner';
import { ContractVerifier } from '../../connectors/ContractVerifier';
import {
  ContractCaseConfig,
  ContractCaseVerifierConfig,
} from '../../entities/config';

export type ContractCaseJestConfig = ContractCaseConfig;
export type ContractCaseJestVerifierConfig = ContractCaseVerifierConfig;

export type DefineCaseJestCallback = (contract: ContractCaseDefiner) => void;

export type VerifyCaseJestCallback = (contract: ContractVerifier) => void;
