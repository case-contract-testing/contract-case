import { CaseError } from '../../matchers/errors.types';
import { AnyCaseMatcherOrData } from '../../matchers/matchers.types';
import { AnyMockDescriptor } from '../../mocks/nodes.types';
import { AnyState } from '../states';

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
