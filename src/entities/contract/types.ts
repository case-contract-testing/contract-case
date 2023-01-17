import type { AnyState } from 'entities/states/types';
import type { AnyInteraction, CaseError } from 'entities/types';

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
  errors: CaseError[];
}

export type CaseExample = SuccessfulCaseExample | FailedCaseExample;
