import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';
import type {
  AnyState,
  AnyMockDescriptor,
  CaseError,
} from '../../entities/types';

export interface CaseContractDescription {
  consumerName: string;
  providerName: string;
}

interface BaseCaseExample {
  readonly states: AnyState[];
  readonly mock: AnyMockDescriptor;
}

interface SuccessfulCaseExample extends BaseCaseExample {
  readonly result: 'VERIFIED';
}

interface PendingCaseExample extends BaseCaseExample {
  readonly result: 'PENDING';
}

interface FailedCaseExample extends BaseCaseExample {
  readonly result: 'FAILED';
  readonly errors: CaseError[];
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
  contractType: 'case::contract';
  description: CaseContractDescription;
  metadata: Record<string, string | Record<string, string>>;
  matcherLookup: Record<string, AnyCaseMatcherOrData>;
  examples: Array<CaseExample>;
}
