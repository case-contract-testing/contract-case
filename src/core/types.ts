import type { ContractData, DataContext, LogContext } from '../entities/types';

export { CaseConfig } from './config/types';

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

export type WriteContract = (
  contract: ContractData,
  context: DataContext
) => string;

export type MakeBrokerApi = (context: DataContext) => Broker;

export interface Broker {
  publishContract: (
    contract: ContractData,
    context: LogContext
  ) => Promise<void>;

  publishContractAdvanced: (
    contract: ContractData,
    logContext: LogContext
  ) => Promise<PublishResult>;

  downloadContract: (
    url: string,
    context: LogContext
  ) => Promise<DownloadedContract<ContractData>>;

  urlsForVerification: (
    serviceName: string,
    context: LogContext
  ) => Promise<ContractLink[]>;
}

interface BrokerNotice {
  level:
    | 'debug'
    | 'info'
    | 'warning'
    | 'prompt'
    | 'success'
    | 'error'
    | 'danger';
}

export interface PublishResult {
  notices: Array<BrokerNotice>;
}
