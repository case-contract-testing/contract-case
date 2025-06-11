import { LogLevelContext, DataContext } from '@contract-case/case-plugin-base';
import { BrokerService } from '../core/BrokerService';
import { ReaderDependencies, WriterDependencies } from '../core/types';
import { makeBrokerApi } from './broker';
import { writeContract } from './contractStore';
import { makeEnvironment } from './BuildEnvironment/BuildEnvironment';
import { makeLogger } from './logger';
import { makeResultFormatter } from './resultPrinter';
import { DEFAULT_TEST_ID } from '../core';
import { makeContractStore } from './contractStore/contractReader';
import { LogPrinter } from './logger/types';
import { ResultPrinter } from './resultPrinter/types';
import { BaseCaseConfig } from '../core/config/types';

const DEFAULT_CONFIG: Partial<BaseCaseConfig> = {
  logLevel: 'warn',
  contractDir: 'case-contracts',
  changedContracts: 'FAIL',
  publish: 'ONLY_IN_CI',
  printResults: true,
  testRunId: DEFAULT_TEST_ID,
  autoVersionFrom: 'TAG',
  adviceOverrides: {},
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
