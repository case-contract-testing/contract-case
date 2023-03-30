import { DataContext, ContractData, LogContext } from '../entities/types';

export type DownloadedContract<T> = T & {
  _links: {
    'pb:pact-version': {
      name: string;
    };
  };
};

export type DownloadedContracts = {
  contractData: DownloadedContract<ContractData>;
  name: string;
}[];

export type ContractLink = {
  href: string;
  name: string;
};

export type MakeBrokerApi = (context: DataContext) => BrokerApi;

export interface BrokerApi {
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
  text: string;
}

export interface PublishResult {
  notices: Array<BrokerNotice>;
}
