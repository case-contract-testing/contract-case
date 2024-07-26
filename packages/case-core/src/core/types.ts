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
