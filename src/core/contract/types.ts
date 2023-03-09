import type {
  ContractData,
  ContextLogger,
  MatchContext,
} from '../../entities/types';

export { CaseConfig } from './config/types';

export type MakeBrokerApi = (
  baseUrl?: string | undefined,
  authToken?: string | undefined
) => Broker;

export interface Broker {
  publishContract: (
    contract: ContractData,
    context: ContextLogger
  ) => Promise<unknown>;
}

export type WriteContract = (
  contract: ContractData,
  context: MatchContext
) => string;
