import type { ContractDescription } from 'entities/contract/types';
import type { MatchingError, AnyInteraction } from 'entities/types';

export type CaseState = string;

interface SuccessfulCaseExample {
  result: 'VERIFIED';
  states: CaseState[];
  interactionKeys: string[];
}

interface FailedCaseExample {
  result: 'FAILED';
  states: CaseState[];
  interactionKeys: string[];
  errors: MatchingError[];
}

export type CaseExample = SuccessfulCaseExample | FailedCaseExample;

export interface ContractFile {
  description: ContractDescription;
  interactionLookup: Record<string, AnyInteraction>;
  examples: Array<CaseExample>;
}
