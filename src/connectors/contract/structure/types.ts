import type { CaseExample, ContractDescription } from 'entities/contract/types';
import type { AnyCaseNodeOrData } from 'entities/types';

export interface ContractFile {
  description: ContractDescription;
  matcherLookup: Record<string, AnyCaseNodeOrData>;
  examples: Array<CaseExample>;
}
