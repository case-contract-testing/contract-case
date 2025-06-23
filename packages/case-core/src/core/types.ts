import {
  DataContext,
  ResultFormatter,
  LogLevelContext,
  Logger,
} from '@contract-case/case-plugin-base';
import { BrokerService } from './BrokerService';
import { DefaultConfig } from './config/types';
import { MakeContractStore } from './types.ContractReader';
import { MakeBrokerApi } from './types.broker';
import { WriteContract } from './types.contract';
import { MakeEnvironment } from './types.environment';

export * from './types.broker';
export * from './types.contract';
export * from './types.environment';

export { CaseConfig } from './config/types';

/**
 * Returned by the core after a successful write of a contract
 */
export interface ContractWriteSuccess {
  /* The path(s) to the contract files written */
  contractPaths: Array<string>;
  /* The consumer slug (ie, the consumer part of the filename), normalised
   * however ContractCase chose to normalise it */
  consumerSlug: string;
  /* The provider slug (ie, the provider part of the filepath), normalised
   * however ContractCase chose to normalise it */
  providerSlug: string;
}

export type MakeBrokerService = (context: DataContext) => BrokerService;

export interface ReaderDependencies {
  defaultConfig: DefaultConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  makeEnvironment: MakeEnvironment;
  makeContractStore: MakeContractStore;
  makeBrokerService: MakeBrokerService;
}

export interface WriterDependencies {
  defaultConfig: DefaultConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  writeContract: WriteContract;
  makeEnvironment: MakeEnvironment;
  makeBrokerService: MakeBrokerService;
}
