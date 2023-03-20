import type {
  ContractData,
  DataContext,
  LogContext,
} from '../../entities/types';

export { CaseConfig } from './config/types';

export type MakeBrokerApi = (context: DataContext) => Broker;

export type ContractLink = {
  href: string;
  name: string;
};

export type DownloadedContract<T> = T & {
  _links: {
    'pb:pact-version': {
      name: string;
    };
  };
};

export interface Broker {
  publishContract: (
    contract: ContractData,
    context: LogContext
  ) => Promise<void>;

  downloadContract: (
    url: string,
    context: LogContext
  ) => Promise<DownloadedContract<ContractData>>;

  urlsForVerification: (
    serviceName: string,
    context: LogContext
  ) => Promise<ContractLink[]>;
}

export type WriteContract = (
  contract: ContractData,
  context: DataContext
) => string;
