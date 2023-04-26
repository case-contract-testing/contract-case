import type {
  DataContext,
  LogLevelContext,
  Logger,
  ResultFormatter,
} from '../entities/types';
import { BrokerService } from './BrokerService';
import { CaseConfig } from './config/types';
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
  defaultConfig: CaseConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  makeEnvironment: MakeEnvironment;
  makeContractStore: MakeContractStore;
  makeBrokerService: MakeBrokerService;
}

export interface WriterDependencies {
  defaultConfig: CaseConfig;
  resultFormatter: ResultFormatter;
  makeLogger: (context: LogLevelContext) => Logger;
  writeContract: WriteContract;
  makeEnvironment: MakeEnvironment;
  makeBrokerService: MakeBrokerService;
}
