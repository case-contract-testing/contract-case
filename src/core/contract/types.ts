import type {
  ContractFile,
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
    contract: ContractFile,
    context: ContextLogger
  ) => Promise<unknown>;
}

export type WriteContract = (
  contract: ContractFile,
  context: MatchContext
) => string;
