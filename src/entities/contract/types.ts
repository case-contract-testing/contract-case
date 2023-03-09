import type {
  AnyState,
  AnyCaseNodeOrData,
  AnyMockDescriptor,
  CaseError,
} from '../../entities/types';

export interface ContractDescription {
  consumerName: string;
  providerName: string;
}

interface BaseCaseExample {
  states: AnyState[];
  mock: AnyMockDescriptor;
}

interface SuccessfulCaseExample extends BaseCaseExample {
  result: 'VERIFIED';
}

interface PendingCaseExample extends BaseCaseExample {
  result: 'PENDING';
}

interface FailedCaseExample extends BaseCaseExample {
  result: 'FAILED';
  errors: CaseError[];
}

export type CaseExample =
  | SuccessfulCaseExample
  | FailedCaseExample
  | PendingCaseExample;

export type ExampleNames = {
  mockName: string;
  requestName: string;
  responseName: string;
};

export interface ContractData {
  description: ContractDescription;
  metadata: Record<string, string | Record<string, string>>;
  matcherLookup: Record<string, AnyCaseNodeOrData>;
  examples: Array<CaseExample>;
}
