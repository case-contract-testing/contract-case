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

/**
 * Describes the actual contract format
 */
export interface ContractData {
  /**
   * Constant to determine what contract type this is
   *
   * ContractCase uses this constant to determine whether or
   * not this contract can be processed.
   *
   * No other values are currently valid.
   */
  contractType: 'case::contract';
  /**
   * Describes the services that this contract is for
   */
  description: CaseContractDescription;
  /**
   * Metadata about how this contract was generated.
   *
   * This field must never affect ContractCase behaviour
   */
  metadata: Record<string, string | Record<string, string>>;
  /**
   * A lookup map of matchers and other named entities defined in this contract
   */
  matcherLookup: Record<string, AnyCaseMatcherOrData>;
  /**
   * The list of interactions defined in this contract
   */
  examples: Array<CaseExample>;
}
