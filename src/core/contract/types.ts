import type {
  ContractData,
  DataContext,
  LogContext,
  MatchContext,
} from '../../entities/types';

export { CaseConfig } from './config/types';

export type MakeBrokerApi = (context: DataContext) => Broker;

export interface Broker {
  publishContract: (
    contract: ContractData,
    context: LogContext
  ) => Promise<unknown>;

  forVerification: (
    serviceName: string,
    context: LogContext
  ) => Promise<unknown>;
}

export type WriteContract = (
  contract: ContractData,
  context: MatchContext
) => string;
