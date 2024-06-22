import { ContractCaseDefiner } from '../../connectors/ContractDefiner.js';
import { ContractVerifier } from '../../connectors/ContractVerifier.js';
import {
  ContractCaseConfig,
  ContractCaseVerifierConfig,
} from '../../entities/config.js';

export type ContractCaseJestConfig = ContractCaseConfig;
export type ContractCaseJestVerifierConfig = ContractCaseVerifierConfig;

export type DefineCaseJestCallback = (contract: ContractCaseDefiner) => void;

export type VerifyCaseJestCallback = (contract: ContractVerifier) => void;
