import type { LogLevelContext, Logger, ResultPrinter } from '../entities/types';
import { MakeBrokerApi } from './broker.types';
import { WriteContract } from './contract.types';

export * from './broker.types';
export * from './contract.types';

export { CaseConfig } from './config/types';

export interface ReaderDependencies {
  resultPrinter: ResultPrinter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
}

export interface WriterDependencies {
  resultPrinter: ResultPrinter;
  makeLogger: (context: LogLevelContext) => Logger;
  makeBrokerApi: MakeBrokerApi;
  writeContract: WriteContract;
}
