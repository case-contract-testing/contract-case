import { AnyCaseMatcherOrData } from '@contract-case/case-plugin-dsl-types';
import { CaseExample } from '@contract-case/case-plugin-base';

export interface CaseContractDescription {
  consumerName: string;
  providerName: string;
}

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
