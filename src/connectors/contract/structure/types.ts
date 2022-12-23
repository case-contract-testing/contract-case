import type { ContractDescription } from 'entities/contract/types';
import type { AnyState } from 'entities/nodes/states/types';
import type {
  MatchingError,
  AnyInteraction,
  AnyCaseNodeOrData,
} from 'entities/types';

interface BaseCaseExample {
  states: AnyState[];
  interaction: AnyInteraction;
}

interface SuccessfulCaseExample extends BaseCaseExample {
  result: 'VERIFIED';
}

interface FailedCaseExample extends BaseCaseExample {
  result: 'FAILED';
  errors: MatchingError[];
}

export type CaseExample = SuccessfulCaseExample | FailedCaseExample;

export interface ContractFile {
  description: ContractDescription;
  matcherLookup: Record<string, AnyCaseNodeOrData>;
  examples: Array<CaseExample>;
}
