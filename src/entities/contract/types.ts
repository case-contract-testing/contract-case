import type { AnyState } from 'entities/states/types';
import type { AnyInteraction, MatchingError } from 'entities/types';

export interface ContractDescription {
  consumerName: string;
  providerName: string;
}

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
