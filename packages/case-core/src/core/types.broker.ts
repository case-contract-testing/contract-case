import { DataContext, LogContext } from '@contract-case/case-plugin-base';
import { ContractData } from '../entities/contract/types';

export interface DownloadedContract extends ContractData {
  createdAt: string;
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

export type DeployCheckSuccess = { deployable: true };
export type DeployCheckFailure = {
  deployable: false;
  reason: string;
};

export type DeployCheckResult = DeployCheckSuccess | DeployCheckFailure;

export type MakeBrokerApi = (context: DataContext) => BrokerApi;

export interface BrokerApi {
  publishContract: (
    contract: ContractData,
    version: string,
    branch: string | false,
    logContext: LogContext,
  ) => Promise<unknown>;

  publishVerificationResults: (
    contract: DownloadedContract,
    success: boolean,
    version: string,
    branch: string | false,
    logContext: LogContext,
  ) => Promise<unknown>;

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
