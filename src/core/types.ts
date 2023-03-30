import type { LogLevelContext, Logger, ResultPrinter } from '../entities/types';
import { MakeBrokerApi } from './types.broker';
import { WriteContract } from './types.contract';
import { MakeEnvironment } from './types.environment';

export * from './types.broker';
export * from './types.contract';
export * from './types.environment';

export { CaseConfig } from './config/types';

export interface ReaderDependencies {
  resultPrinter: ResultPrinter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  makeEnvironment: MakeEnvironment;
}

export interface WriterDependencies {
  resultPrinter: ResultPrinter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  writeContract: WriteContract;
  makeEnvironment: MakeEnvironment;
}
