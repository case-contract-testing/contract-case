import { BrokerService } from '../core/BrokerService';
import {
  CaseConfig,
  ReaderDependencies,
  WriterDependencies,
} from '../core/types';
import { DataContext, LogLevelContext } from '../entities/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contractStore';
import { makeEnvironment } from './BuildEnvironment/BuildEnvironment';
import { makeLogger } from './logger';
import { makeResultFormatter } from './resultPrinter';
import { DEFAULT_TEST_ID } from '../core';
import { makeContractStore } from './contractStore/contractReader';
import { LogPrinter } from './logger/types';
import { ResultPrinter } from './resultPrinter/types';

const DEFAULT_CONFIG: CaseConfig = {
  logLevel: 'warn',
  contractDir: 'case-contracts',
  publish: 'ONLY_IN_CI',
  printResults: true,
  testRunId: DEFAULT_TEST_ID,
};

export const writerDependencies: (
  printer: LogPrinter & ResultPrinter,
) => WriterDependencies = (printer) => ({
  defaultConfig: { ...DEFAULT_CONFIG, throwOnFail: true },
  resultFormatter: makeResultFormatter(printer),
  makeLogger: (context: LogLevelContext) => makeLogger(context, printer),
  writeContract,
  makeEnvironment,
  makeBrokerService: (context: DataContext) =>
    new BrokerService(makeBrokerApi(context), makeEnvironment()),
});

export const readerDependencies: (
  printer: LogPrinter & ResultPrinter,
) => ReaderDependencies = (printer) => ({
  defaultConfig: { ...DEFAULT_CONFIG, throwOnFail: false },
  resultFormatter: makeResultFormatter(printer),
  makeLogger: (context: LogLevelContext) => makeLogger(context, printer),
  makeBrokerApi,
  makeEnvironment,
  makeContractStore,
  makeBrokerService: (context: DataContext) =>
    new BrokerService(makeBrokerApi(context), makeEnvironment()),
});
