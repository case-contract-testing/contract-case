import { DataContext, LogContext } from '@contract-case/case-plugin-base';
import { ContractData } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

export interface DownloadedContract extends ContractData {
  _links: {
    'pb:pact-version': {
      name: string;
    };
    'pb:publish-verification-results': {
      title: string;
      href: string;
    };
  };
}

// TODO: Can probably remove this
export type DownloadedContracts = {
  contractData: DownloadedContract;
  name: string;
}[];

export type ContractFileFromDisk = {
  contents: DownloadedContract;
  filePath: string;
};

export type ContractLink = {
  href: string;
  name: string;
};

export type DeployCheckSuccess = { deployable: true } & HasBrokerNotices;
export type DeployCheckFailure = {
  deployable: false;
  reason: string;
} & HasBrokerNotices;

export type DeployCheckResult = DeployCheckSuccess | DeployCheckFailure;

export type MakeBrokerApi = (context: DataContext) => BrokerApi;

export interface BrokerApi {
  publishContract: (
    contract: ContractData,
    version: string,
    context: LogContext,
  ) => Promise<void>;

  publishContractAdvanced: (
    contract: ContractData,
    version: string,
    branch: string | false,
    logContext: LogContext,
  ) => Promise<PublishContractResult>;

  publishVerificationResults: (
    contract: DownloadedContract,
    success: boolean,
    version: string,
    branch: string | false,
    logContext: LogContext,
  ) => Promise<PublishVerificationResult>;

  downloadContract: (
    url: string,
    context: LogContext,
  ) => Promise<DownloadedContract>;

  urlsForVerification: (
    serviceName: string,
    context: LogContext,
  ) => Promise<ContractLink[]>;

  canDeploy: (
    serviceName: string,
    serviceVersion: string,
    environment: string,
    context: LogContext,
  ) => Promise<DeployCheckResult>;
}

interface BrokerNotice {
  type:
    | 'debug'
    | 'info'
    | 'warning'
    | 'prompt'
    | 'success'
    | 'error'
    | 'danger';
  text: string;
}

export interface PublishVerificationResult {
  logs: Array<BrokerNotice>;
}

export interface HasBrokerNotices {
  notices: Array<BrokerNotice>;
}

export type PublishContractResult = HasBrokerNotices;
